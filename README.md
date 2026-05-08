# James Wang's Portfolio

A high-performance, multilingual personal portfolio built with **Nuxt 3**, **Tailwind CSS**, and **Nuxt Content v3**.

- [Live Demo Link]

![Portfolio Screenshot](.github/assets/screenshot.png)

## Key Features

-  **Multilingual Support:** Full i18n integration (English & Chinese) using `@nuxtjs/i18n`.
-  **Content-Driven:** All portfolio data (About, Experience, Skills) is managed via YAML files in the `/content` directory.
-  **Smart Scroll Spy:** Type-safe, component-based intersection observers that update the navigation header in real-time.
-  **Dark Mode:** System-aware theme switching via `@nuxtjs/color-mode`.
-  **Performance:** Optimized images, zero-layout shift, and hybrid rendering.

## Tech Stack

- **Framework:** [Nuxt 3](https://nuxt.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) / [Nuxt UI](https://ui.nuxt.com/)
- **Content Management:** [Nuxt Content](https://content.nuxt.com/)
- **Animation:** [VueUse](https://vueuse.org/) (Intersection Observers) & CSS Transitions
- **Deployment:** [Vercel](https://vercel.com/)

## Project Structure

The project separates logic from data to make updates effortless:

- `/content`: Contains `en/index.yml` and `zh/index.yml`. Update these to change site content.
- `/i18n`: Internationalization files.
- `app/composables`: Houses the scroll-spy logic and global state management.
- `app/components`: Modular UI components (Hero, Experience, Skills).
- `app/pages/index.vue`: The main entry point that fetches data from the collection.

## Local Development

1. **Clone the repo:**
   ```bash
   git clone https://github.com/drinkthis4me/my-portfolio.git
   ```
2. **Install dependencies:**
   ```bash
   pnpm install
   ```
3. **Start the development server:**
   ```bash
   pnpm run dev
   ```
4. **Build for production:**
   ```bash
   pnpm run build
   ```
5. **Locally preview production build:**
   ```bash
   pnpm run preview
   ```

## License

- [MIT](./LICENSE)