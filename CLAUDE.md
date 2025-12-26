# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A personal blog built with Next.js 15, React 19, and MDX. The site is statically exported (SSG) and supports both English and Turkish content.

## Commands

```bash
bun dev              # Start development server
bun run build        # Build static site
bun run lint         # Run ESLint
bun test             # Run tests in watch mode
bun test:ci          # Run tests once (CI mode)
bun test:coverage    # Generate coverage report
```

## Architecture

### Content System
- Blog posts are MDX files in `/content/posts/[en|tr]/[slug]/index.mdx`
- Frontmatter includes: `title`, `description`, `date`, `permalink`, `lang`
- Posts loaded via `src/util/posts.ts` using `gray-matter` for frontmatter parsing
- Custom MDX components registered in `mdx-components.tsx`

### Routing (App Router)
- English posts: `/[slug]/` → `src/app/[slug]/page.tsx`
- Turkish posts: `/tr/[slug]/` → `src/app/tr/[slug]/page.tsx`
- Static params generated via `generateStaticParams()` and `generateMetadata()`

### Path Aliases
```
~ or @     → ./src/*
@content   → ./content/*
```

### Theme System
- React Context in `src/components/theme-provider.tsx`
- Persisted to localStorage, respects system preference
- `theme-hack.ts` inline script prevents flash of wrong theme on load

### Styling
- CSS Modules for component styles (`*.module.css`)
- Design tokens in `src/styles/variables.css`
- Prism syntax highlighting for code blocks

## Key Files

| Purpose | Location |
|---------|----------|
| Root layout & analytics | `src/app/layout.tsx` |
| Post data loading | `src/util/posts.ts` |
| Theme management | `src/components/theme-provider.tsx` |
| Design tokens | `src/styles/variables.css` |
| Next.js config | `next.config.mjs` |
| MDX components | `mdx-components.tsx` |

## Testing

Tests use Vitest with jsdom and @testing-library/react. Test files are colocated with source files using `*.test.ts` naming convention.

## Adding Content

To add a new blog post:
1. Create `/content/posts/[en|tr]/[slug]/index.mdx`
2. Include required frontmatter: `title`, `description`, `date`, `permalink`, `lang`
3. Post images go in `/public/images/posts/[slug]/`
