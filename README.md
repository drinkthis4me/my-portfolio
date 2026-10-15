# James Wang's Portfolio

My personal portfolio built with **Nuxt**, **Tailwind CSS**, and **Nuxt Content**.

- [**Live Link**](https://james-wang-portfolio.vercel.app)

## Key Features

-  **Multilingual Support:** Full i18n integration (English & Chinese) using `@nuxtjs/i18n`.
-  **Content-Driven:** All portfolio data is managed via Markdown/YAML files in the `/content` directory.
- **SEO & Social Metadata:** 
    - **Dynamic Metadata:** Automated Open Graph and Meta tag generation pulled directly from localized content.
    - **Absolute URL Resolution:** Intelligent `runtimeConfig` to ensure correct social sharing links across Production and Preview environments.
- **Performance & Rendering:** 
    - **Static Site Generation (SSG):** Full prerendering via the Nitro engine for instant Time-to-First-Byte (TTFB).
    - **Optimized Assets:** Zero-layout shift (CLS) design with lazy-loaded components and optimized image handling.

## Tech Stack

- **Framework:** [Nuxt](https://nuxt.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Content Management:** [Nuxt Content](https://content.nuxt.com/)
- **Animation:** [motion.dev](https://motion.dev/)
- **Deployment:** [Vercel](https://vercel.com/)

## Project Structure

- `/content`: Locale specific content.
- `/i18n`: Internationalization files.
- `/app`: Main entry, css, component, composables, pages and more.

All pages are static generated. No server side code.

## License

- [MIT](./LICENSE)