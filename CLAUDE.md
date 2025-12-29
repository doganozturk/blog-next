# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A personal blog built with Next.js 16, React 19, and MDX. The site is statically exported (SSG) and supports both English and Turkish content with proper i18n routing.

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

### Routing (App Router with i18n)
- Root `/` redirects to `/en/`
- English posts: `/en/[slug]/` → `src/app/[lang]/[slug]/page.tsx`
- Turkish posts: `/tr/[slug]/` → `src/app/[lang]/[slug]/page.tsx`
- Language-specific layout: `src/app/[lang]/layout.tsx` sets `<html lang>`
- Static params generated via `generateStaticParams()` and `generateMetadata()`
- Old English URLs (e.g., `/post-slug/`) redirect to `/en/post-slug/` via Vercel

### Path Aliases
```
~ or @     → ./src/*
@content   → ./content/*
```

### Theme System
- Uses `next-themes` library for theme management
- Persisted to localStorage, respects system preference
- No flash of wrong theme (handled by next-themes)
- Theme toggle in `src/components/theme-switcher/theme-switcher.tsx`

### Styling
- CSS Modules for component styles (`*.module.css`)
- Design tokens in `src/styles/variables.css`
- Prism syntax highlighting for code blocks

## Key Files

| Purpose | Location |
|---------|----------|
| Language layout (html lang, theme) | `src/app/[lang]/layout.tsx` |
| Root layout (metadata only) | `src/app/layout.tsx` |
| Post data loading | `src/util/posts.ts` |
| Theme toggle | `src/components/theme-switcher/theme-switcher.tsx` |
| Design tokens | `src/styles/variables.css` |
| Global styles | `src/app/globals.css` |
| Next.js config | `next.config.ts` |
| MDX components | `mdx-components.tsx` |
| Vercel redirects | `vercel.json` |

## Testing

Tests use Vitest with jsdom and @testing-library/react. Test files are colocated with source files using `*.test.ts` naming convention.

## Adding Content

To add a new blog post:
1. Create `/content/posts/[en|tr]/[slug]/index.mdx`
2. Include required frontmatter: `title`, `description`, `date`, `permalink`, `lang`
3. Post images go in `/public/images/posts/[slug]/`
