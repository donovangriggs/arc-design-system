# Arc Design System Showcase

A stunning interactive showcase of the **Arc Design System** — a cross-framework design system built once with Stencil Web Components and consumed by React, Vue, Angular, and Svelte.

This is a **static React + Vite site** that demonstrates 10 Arc components across multiple framework implementations, featuring live code previews, framework-specific examples, and design system documentation.

## Features

- Interactive component showcases with live previews
- Framework-specific code examples (React, Vue, Angular, Svelte)
- Real-time syntax highlighting with Shiki
- Dark/light theme toggle with localStorage persistence
- Responsive design with Tailwind CSS v4
- Smooth animations with Framer Motion
- Built with modern tooling: React 19, Vite 6, TypeScript

## Quick Start

### Prerequisites
- Node.js 18+
- pnpm (or npm/yarn)

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev
```

The site will be available at `http://localhost:5173`

## Available Scripts

<!-- AUTO-GENERATED Scripts Table -->

| Script | Command | Purpose |
|--------|---------|---------|
| `dev` | `vite` | Start Vite development server with hot module reloading |
| `build` | `tsc -b && vite build` | Type-check with TypeScript and build for production |
| `preview` | `vite preview` | Preview the production build locally |

<!-- END AUTO-GENERATED Scripts Table -->

## Environment Variables

<!-- AUTO-GENERATED Environment Variables -->

Create a `.env` file in the project root with the following variables:

| Variable | Purpose | Example |
|----------|---------|---------|
| `VITE_STORYBOOK_URL` | URL to the Arc Storybook instance | `http://localhost:6006` |
| `VITE_GITHUB_URL` | GitHub repository URL | `https://github.com/donovangriggs/megastorybook` |

**Note:** See `.env.example` for the template. These are client-side variables prefixed with `VITE_` and are safe to expose.

<!-- END AUTO-GENERATED Environment Variables -->

## Project Structure

```
src/
├── components/           # React components
│   ├── layout/          # Header, sidebar, layout components
│   ├── hero/            # Hero section and introductory components
│   ├── showcase/        # Component showcase, previews, code panels
│   └── shared/          # Theme toggle, error boundary, shared utilities
├── hooks/               # Custom React hooks
│   ├── useActiveSection.ts   # Track active component in viewport
│   └── useFramework.tsx      # Framework context provider
├── data/                # Component registry and static data
│   ├── component-registry.ts # Component definitions
│   └── snippets/        # Code examples for each framework
├── types/               # TypeScript type definitions
├── styles/              # Global CSS and Tailwind configuration
└── App.tsx & main.tsx   # Application entry point
```

## Technology Stack

### Core
- **React 19** - UI library
- **TypeScript 5.7** - Type safety
- **Vite 6** - Build tool with HMR
- **Tailwind CSS v4** - Utility-first styling

### Design System
- **@arctech/core** - Stencil Web Components (local)
- **@arctech/tokens** - Design tokens (local)

### UI & Animation
- **Framer Motion 12** - Smooth animations
- **lucide-react** - Icon library

### Development
- **Syntax Highlighting** - Shiki for code blocks
- **React Plugin for Vite** - Fast refresh and JSX transformation

## Build Process

The project uses a two-step build process:

1. **Type Checking**: `tsc -b` validates TypeScript
2. **Bundling**: `vite build` creates optimized production bundle

```bash
pnpm run build
# Output: dist/ directory with production-ready files
```

## Development

### Hot Module Reloading
Changes to component files automatically refresh in the browser without losing state.

### TypeScript Strict Mode
The project enforces strict TypeScript checking:
- No implicit `any`
- No unused variables/parameters
- Exhaustive switch cases
- No unchecked indexed access

### Path Aliases
Import from `@/` to reference the `src/` directory:
```typescript
import { ComponentExplorer } from '@/components/showcase/ComponentExplorer';
```

## Theme System

The showcase supports light and dark themes:

- **Storage**: Theme preference saved to `localStorage` with key `arc-theme`
- **Default**: Dark theme (set in `data-theme` attribute on `<html>`)
- **Values**: `'light'` or `'dark'`
- **Toggle**: Use the `ThemeToggle` component in the header

### Theme Initialization
The theme is restored from storage before React renders (see `index.html`):
```html
<script>
  try {
    const t = localStorage.getItem('arc-theme');
    if (t === 'light' || t === 'dark') {
      document.documentElement.setAttribute('data-theme', t);
    }
  } catch (e) {}
</script>
```

## Component Showcase

The `ComponentExplorer` displays all Arc components with:

1. **Component Section** - Overview and description
2. **Live Preview** - Interactive component instance
3. **Code Panel** - Framework-specific code examples
4. **Props Table** - Available props and their types
5. **Framework Tabs** - Switch between React, Vue, Angular, Svelte examples

Each component is defined in the component registry with metadata, props, and code snippets.

## Security

The project includes a Content Security Policy (CSP) in `index.html`:
- Scripts: Only inline and `'wasm-unsafe-eval'` for Shiki syntax highlighting
- Styles: Inline and Google Fonts
- Fonts: Google Fonts API
- Images: Data URIs and self-hosted
- Connections: Same-origin only

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Deployment

### Production Build
```bash
pnpm run build
```

Static files are in the `dist/` directory. Deploy to any static hosting:
- Vercel
- Netlify
- GitHub Pages
- AWS S3
- Cloudflare Pages

### Environment Variables
For production deployments, set environment variables in your hosting platform:
- `VITE_STORYBOOK_URL` - Storybook URL
- `VITE_GITHUB_URL` - GitHub repository URL

These are embedded into the bundle during build.

## Performance

- **Tree-shaking**: Vite removes unused code
- **Code Splitting**: Dynamic imports for component code examples
- **CSS Optimization**: Tailwind purges unused styles
- **Image Optimization**: SVG icons and optimized assets
- **Syntax Highlighting**: Shiki pre-renders code at build time

## Troubleshooting

### Build Fails
Ensure TypeScript compiles without errors:
```bash
npx tsc --noEmit
```

### Hot Reload Not Working
- Check that Vite server is running on `http://localhost:5173`
- Browser WebSocket connection may be blocked by firewall/proxy
- Restart dev server: `pnpm run dev`

### Styling Issues
- Tailwind classes must be in files listed in `tailwind.config.js` (Vite plugin handles this)
- CSS not applying? Check TypeScript compilation errors first

## Related Resources

- **Storybook**: [Arc Storybook](http://localhost:6006) - Full component documentation
- **GitHub**: [megastorybook](https://github.com/donovangriggs/megastorybook) - Source repository
- **Arc Design System**: Cross-framework component library

## License

MIT
