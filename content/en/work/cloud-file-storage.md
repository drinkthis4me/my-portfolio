---
slug: cloud-file-storage
publishedAt: 2026-09-23
title: Cloud File Storage
description: A modern file storage application with dedicated file management server and blob storage server.
technologies:
  - Nuxt
  - TypeScript
  - Prisma
  - Amazon S3 SDK
  - Minio
image: /images/projects/cloud-file-storage/landing-page-1600x900.webp
githubLink: https://github.com/drinkthis4me/nuxt-cloud-storage-clone
featured: true
---

# Building a Dropbox Clone on My Laptop

*Chunked uploads, presigned URLs, and everything I got wrong along the way: a hobby-scale walkthrough of a file-storage system built with Nuxt, Prisma, SQLite, and MinIO.*

## Why build this

I wanted to understand file-storage systems by building the interesting parts rather than reading about them. The starting point was the [Dropbox breakdown on Hello Interview](https://www.hellointerview.com/learn/system-design/problem-breakdowns/dropbox), a system design problem that covers chunked uploads, sync, sharing, and the machinery needed to run all of it for millions of users.

I didn't need millions of users. This was a hobby project, meant to run on localhost and never get deployed. So the rule became: **keep the real protocols, drop the infrastructure.** If a piece of the design taught me something about how file storage actually works, it stayed. If it only existed to survive scale (a CDN, multi-region replication, load balancers), it went.

## What I kept and what I cut

| Concept | Production design | My version |
| --- | --- | --- |
| Blob storage | S3 + CDN | MinIO in Docker, which speaks the S3 API |
| Metadata | DynamoDB | SQLite via Prisma |
| Upload | Presigned URLs, multipart, chunking, dedup | All of it, unchanged |
| Sharing | Normalized share tables | Same idea, split into per-person shares and share links |
| Client | Native desktop sync agent | Browser tab |
| Scale and HA | Multi-region | One machine |

The nice property of MinIO is that it implements the S3 API faithfully. The code I wrote against it uses the real AWS SDK and the real presigned-URL and multipart flows, so nothing about the storage layer is a simulation.

## The stack

- [**Nuxt (Nitro server routes plus Vue)**](https://nuxt.com/) for the whole application. I seriously considered Spring Boot for the backend, but nothing in the project ever pushed past what Nitro could do, so I stayed full-stack in one codebase.
- **[Prisma 7](https://www.prisma.io/) with [SQLite](https://www.sqlite.org/)** for metadata. Zero setup, and a single file I can delete when I want a clean slate.
- [**MinIO**](https://docs.min.io/aistor/installation/container/install/) for object storage, started with Docker Compose along with a sidecar that creates the bucket.
- [**nuxt-auth-utils**](https://github.com/atinux/nuxt-auth-utils) for cookie sessions.
- [**Nuxt UI**](https://ui.nuxt.com/) for UI components.
- [**Zod**](https://zod.dev/) for validation, with schemas shared between client and server.
- [**Pinia**](https://pinia.vuejs.org/), but only for the global upload queue. Everything else is page-local data fetching.

## Architecture

The central design decision is that **the server never touches file bytes.** Nitro issues short-lived presigned URLs and tracks metadata. The browser talks to MinIO directly for the actual transfer.

```
Browser --metadata--> Nitro --> SQLite
   ^                    |
   |<-- presigned URL --+
   |
   +------ file bytes ------------> MinIO
```

The lifecycle of a small upload looks like this:

1. The client sends name, size, MIME type, and a SHA-256 fingerprint to `POST /api/files`.
2. The server checks for a duplicate by fingerprint. If none exists, it creates a `File` row with status `UPLOADING` and returns a presigned `PUT` URL.
3. The browser uploads straight to MinIO.
4. The client calls a `complete` endpoint. The server does a `HeadObject` against MinIO to verify the object exists and the size matches, then flips the row to `UPLOADED`.

That last step matters. The server never trusts the client's claim that an upload finished. It checks storage itself.

## Decisions that shaped the design

**Folders are just files.** The schema has a single `File` model with an `isFolder` flag and a self-referencing `parentFolderId`. Listing the root and listing a subfolder are the same query with a different parent. This removed a lot of branching that a separate `Folder` table would have required.

**One creation endpoint, and the server picks the strategy.** `POST /api/files` creates both files and folders, discriminated by the body. For files, the server decides whether the upload should be a single `PUT` or chunked, and the response tells the client which path to follow. My first instinct was to let the client choose based on file size, but that duplicates a threshold in two places and lets a buggy client pick wrong. The server already knows the size, so it owns the decision.

**Actions that verify are not `PATCH`.** Finalizing an upload isn't a field update. It queries storage and refuses to take the client's word. Modeling it as `POST /api/files/:id/complete` instead of `PATCH { status: 'UPLOADED' }` is more honest about what it does, and it closes the hole where a client could mark its own file as complete.

**Deletion is two steps.** `DELETE` soft-deletes by default. Permanent deletion requires the file to already be in the trash, so an accidental permanent delete is structurally impossible rather than just discouraged by the UI. Folders can only be deleted when empty, a deliberate scope cut that avoided recursive deletion for now.

**Denied access returns 404, not 403.** A 403 confirms that a resource exists. Returning 404 for both missing and forbidden files avoids leaking which IDs are real.

<!--**The app is client-rendered only.** Everything sits behind auth, so there's no public content to pre-render, and server rendering would have meant paying for it on every navigation while still waiting for hydration before drag-and-drop or selection worked. It also sidestepped a class of hydration bugs with libraries that manipulate the DOM directly.-->

## The interesting part: chunked uploads

Large files use the real S3 multipart protocol, which breaks down into four server steps: initiate the session, presign each part, record each part's ETag, and finalize.

A key property I'm glad I understood early: the final `CompleteMultipartUpload` call rejects mismatched ETags itself, so the server doesn't need to independently verify every chunk. Trust is deferred to that one call.

Upload progress handling was a surprise. The server can't know smooth byte-level progress, because it only learns about a chunk when that chunk finishes. Real progress requires the browser's `XMLHttpRequest.upload.onprogress`, since `fetch` can't report upload progress. So there are two sources of truth: a live in-memory Pinia store for smooth progress, and a server-backed endpoint that lets the store be rebuilt after a page refresh with coarser, chunk-level progress.

Pause, resume, and cancel fell out of that design:

- **Pause** aborts the in-flight chunk request and stops the loop before the next chunk.
- **Resume** asks the server which parts are already uploaded and continues from the first missing one.
- **Cancel** aborts the multipart session in MinIO, deletes the chunk records, and removes the file row.

There is one honest limitation. Browsers cannot persist a `File` handle across a page reload, so an upload paused before a refresh can't be resumed without the user re-selecting the file. The UI reflects this: the resume button is disabled with an explanation when the file handle is gone, rather than pretending resume works everywhere.

## Sharing

The original `Share` table could only express one thing: a specific user has a permission on a specific file. The requirements went further: invite people by email, including people without accounts, and support anyone-with-the-link access with optional passwords and expiration. Those are different enough that I split them into two models.

- **`Share`** is per-person. The `userId` is nullable and the invited email is always stored, so a share can exist before the invitee signs up.
- **`ShareLink`** is a revocable link with its own token, optional password hash, optional expiry, and a soft-revoke timestamp.

Two details are worth calling out. First, the password is never sent in a query string, where it would end up in server logs, browser history, and referrer headers. Instead there's a separate unlock `POST` that sets a narrowly scoped, HTTP-only cookie. Second, a shared folder renders as its own scoped mini file browser, and every request under a link re-validates the link and checks that the requested folder is genuinely inside the shared tree. A valid token proves access to one tree, not to any ID you can guess. The breadcrumb walk for shared links stops at the link's root and never reveals the names of folders above it.

## Challenges

Most of what I learned came from bugs, and a few are worth recounting.

<!--**My own errors got swallowed.** I wrapped whole blocks of logic in a `try/catch` that converted every failure into a 500. That included errors I had deliberately thrown myself, like a 404 for a missing file, which became a generic 500 on the way out. The fix was discipline: a `try` should wrap exactly one external call, and validation throws belong outside it.-->

**BigInt breaks JSON.** File sizes need `BigInt` to cover large files, but `JSON.stringify` throws on it. Every response has to pass through a serializer that converts sizes to strings, and dates to ISO strings, with an explicit return type so TypeScript catches a missed field.

<!--**Prisma 7 changed the rules.** The datasource URL moved out of the schema file into the config file, and the client now requires a driver adapter even for SQLite.-->

**The table wouldn't update after a rename.** The data patched correctly but the UI stayed stale. Mutating an array in place wasn't enough for the table's memoization to notice. Replacing the array with a new reference fixed it.

**Drag-and-drop into folders fought the sortable library.** The library was handling drag, and I needed to repurpose it to detect dropping onto a folder without actually reordering rows. Disabling sorting also changed which callbacks fire, and I had to verify the drop target using the real cursor position at release rather than the last hovered row, otherwise dragging past a folder and releasing elsewhere still moved the file.

**Email casing quietly broke sharing.** I normalized invited emails to lowercase before looking up users, but registration stored whatever casing the user typed, so existing users were never found. The right fix was to normalize at account registration (write time), not only at lookup.

**Page state vanished on navigation.** Moving between folder URLs remounted the page and destroyed local state. A stable page key kept the component alive so data and breadcrumbs persisted across navigation.

## Results

The project works end to end. You can upload files of any size (with customizable size limit), with large ones automatically chunked and fully controllable mid-flight. You can organize them in nested folders with multi-select, drag-and-drop, context menus, rename, move, and trash. And you can share them by email or by link, with passwords and expirations, to people with or without an account, who can browse and download shared folders in a scoped view.

I didn't benchmark anything, and I'm not claiming performance numbers. The value here was studying and understanding.

## What I'd improve

- **Clean up abandoned uploads.** A crashed tab leaves a stale `UPLOADING` row. A scheduled cleanup job is the obvious fix.
- **Recursive folder deletion**, which I cut for simplicity.
- **Claim pending invites on signup.** When an invited email registers, pending shares should attach to the new account automatically.
- **Retrofit access checks.** Existing endpoints still assume a logged-in user and need to accept share-link access too.
- **Real-time sync.** The original design included WebSocket-based change notification and an optional folder-watching agent. I haven't built either yet.
- **Version history and delta sync**, which would turn this from a file store into something closer to the real product.
- **Documentation editor for texts/sheets**. This one is out-of-scope for a pure file storage app, but necessary for a commercial product.

## Closing thoughts

Scaling down a system design problem turned out to be a better exercise than answering it at full scale. When you can't hide behind infrastructure, you have to understand what each piece is actually for. The presigned URL isn't just a performance trick. It's what keeps the server out of the data path. The `complete` endpoint isn't ceremony. It's where trust gets established. Building the small version made those distinctions concrete in a way a whiteboard never did.
