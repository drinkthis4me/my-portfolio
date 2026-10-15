---
slug: url-shortener-service
publishedAt: 2026-08-12
title: URL Shortener Service
description: A URL shortener with custom alias, password, and expiration date. Plus link management dashboard.
technologies:
  - Nuxt
  - Zod
  - TypeScript
  - Prisma
image: /images/projects/url-shortener-service/front-page-1600x900.webp
githubLink: https://github.com/drinkthis4me/nuxt-url-shortener
featured: true
---

# URL Shortener Service

## Overview

A full-stack URL shortener that makes sharing links simple while giving users more control over how their links are accessed and managed.

Beyond generating short URLs, the service supports custom aliases, password protection, and expiration dates. A link management dashboard brings these capabilities together, allowing users to manage their shortened links in one place.

The goal was to build a practical, full-stack application that combines a straightforward user experience with reliable data validation and persistent storage.

## Architecture

The application is built with Nuxt and TypeScript, using a small set of focused technologies to handle the user interface, validation, and data persistence.

- [**Nuxt**](https://nuxt.com/) + [**NuxtUI**](https://ui.nuxt.com/): Build the application interface and structure the full-stack application with reusable components.
- [**Zod**](https://zod.dev/): Define validation schemas for user input, helping enforce consistent data requirements.
- [**Prisma**](https://www.prisma.io/) + [**SQLite**](https://www.sqlite.org/): Model application data and persist shortened links in a relational database.
- [**Sqids**](https://sqids.org/): Generate compact, URL-friendly identifiers for shortened links.

The architecture keeps the main responsibilities clear: the UI collects user input, validation checks incoming data, application logic handles link operations, and Prisma manages database access.

## Core Features & Technical Decisions

### Compact ID with Sqids
Readable, compact identifiers make shortened URLs easier to share. Sqids provides a way to encode numeric identifiers into URL-friendly strings without exposing the underlying numeric representation directly.

- Decision: Replaced traditional incremental string hashes with Sqids.
- Implementation: Instead of exposing raw auto-incrementing database primary keys (e.g., /1, /42) or storing separate string slugs, the primary key ID is encoded on the fly into a professional short code (e.g., /b9Kx2).
- Benefits: Delivers O(1) database primary key lookups (WHERE id = ?) while keeping URLs compact and unpredictable. Configuration (alphabets and blocklists) is cleanly managed via server runtime configurations.

### Secure Redirection & Protection Middleware
- Middleware Pipeline: Incoming route requests are intercepted by a high-performance H3 server middleware.
- Validations: Automatically validates URL structures using regex patterns, screens against reserved application routes, and checks link expiration limits.
- Password Protection: Links requiring authentication redirect users to a protection portal and set a secure httpOnly cookie and authorization cookies upon successful verification.

### Schema-based validation with Zod

URL shortening involves more than accepting a URL string. Optional settings such as custom aliases, passwords, and expiration dates introduce additional validation requirements.

Zod provides a centralized way to define and reuse validation rules. This helps keep input handling consistent and makes invalid data easier to reject before it reaches the database.

### Prisma with SQLite

Prisma provides a typed database access layer and a schema-driven approach to data modeling. Combined with SQLite, it offers a lightweight persistence solution without requiring a separately managed database server.

This setup keeps deployment and local development relatively simple while providing a relational data model that can be extended as the application grows.

### Configurable link behavior

Custom aliases, password protection, and expiration dates address different sharing needs:

- **Custom aliases** make links easier to recognize and remember.
- **Password protection** adds an access check before a protected destination is revealed.
- **Expiration dates** allow links to stop being usable after a defined time.

Keeping these options within a single link-creation workflow makes the service more flexible without complicating its primary purpose.

## Challenges

### Validating multiple link configurations

Each optional setting introduces different constraints. For example, a custom alias may need uniqueness checks, an expiration date must be interpreted consistently, and password-protected links require appropriate access handling.

Using schema-based validation helps establish clear input requirements. Database constraints and server-side checks remain important for enforcing rules that cannot be guaranteed by input validation alone.

### Balancing usability with access control

A short URL should redirect users with minimal friction, but protected or expired links need different handling.

The redirect flow must account for these conditions before sending the user to the destination. Password protection should be enforced on the server, and expiration should be checked when the link is accessed rather than relying solely on client-side behavior.

### Keeping link management straightforward

A link management dashboard needs to make created links and their configurations easy to understand. Custom aliases, destination URLs, and expiration settings can all affect how a link is identified and maintained.

## Summary / Improvements

This project brought together full-stack application development, schema validation, database modeling, and URL routing in a focused product.

The link-sharing service provides beyond basic URL generation. It also supports configurable link behavior, persistent data, and link management.

Potential next steps include:

- **Analytics:** Track visits and provide basic usage statistics for each shortened link.
- **Improved link management:** Add search, filtering, and pagination as the number of links grows.
- **More robust access control:** Review password storage, rate limiting, and abuse prevention.
- **Lifecycle management:** Add cleanup for expired links and clearer handling of unavailable destinations.
- **Redis caching**: A caching layer reduces database reading and speed up redirection lookups.
- **Testing:** Expand unit and end-to-end coverage for link creation, redirects, password verification, and expiration behavior.
