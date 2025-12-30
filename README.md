# My Personal Blog

This is my blog which I recently rewrote using [Next.js 16](https://nextjs.org/). Previously built with [Qwik-City](https://github.com/doganozturk/blog-qwik), I migrated to Next.js for its integration with Vercel and to try latest React features.

## Local Development

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

If you want to set up a development environment for the project, you need:

```
brew install oven-sh/bun/bun
```

*Note: This project uses [Bun](https://bun.sh) as its JavaScript runtime and package manager for faster installs and execution.

### Installing

```
git clone https://github.com/doganozturk/blog-next.git

cd blog-next

# Install project dependencies
bun install

# Start local dev environment
bun dev
```

### Available Commands

```bash
bun dev              # Start development server
bun run build        # Build static site (+ sitemap generation)
bun run lint         # Run ESLint
bun test             # Run tests in watch mode
bun test:ci          # Run tests once
bun test:coverage    # Generate coverage report
```

## Tech Stack

- **Framework:** Next.js 16 with App Router
- **Runtime:** Bun
- **Content:** MDX with gray-matter frontmatter
- **Styling:** CSS Modules + CSS Variables
- **Theme:** next-themes
- **i18n:** Dynamic `[lang]` route segment (en/tr)
- **Analytics:** Vercel Analytics & Speed Insights
- **SEO:** next-sitemap for sitemap generation
- **Deployment:** Vercel (static export)

## Author

- **Doğan Öztürk** - [Github](https://github.com/doganozturk)
