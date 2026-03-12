# Contributing to Arc Design System Showcase

Thank you for your interest in contributing! This guide explains how to develop, test, and submit changes.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Development Workflow](#development-workflow)
3. [Code Style](#code-style)
4. [Component Showcase Updates](#component-showcase-updates)
5. [Testing](#testing)
6. [Committing Changes](#committing-changes)

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Setup

```bash
# Clone the repository
git clone <repository-url>
cd megastorybook-showcase

# Install dependencies
pnpm install

# Start development server
pnpm run dev
```

## Development Workflow

### 1. Create a Feature Branch

```bash
git checkout -b feature/description-of-feature
```

Use descriptive branch names:
- `feature/add-component-docs` - New features
- `fix/theme-toggle-bug` - Bug fixes
- `docs/update-readme` - Documentation
- `refactor/improve-component-structure` - Refactoring

### 2. Make Changes

Edit files in the `src/` directory. The development server supports hot module reloading (HMR) — changes save automatically.

### 3. Run Type Checking

```bash
npx tsc --noEmit
```

The project uses strict TypeScript:
- No implicit `any` types
- No unused variables or parameters
- Exhaustive switch statements
- Safe indexed access

### 4. Build and Test

```bash
# Type-check and build for production
pnpm run build

# Preview the production build
pnpm run preview
```

### 5. Commit and Push

```bash
git add <files>
git commit -m "feat: description of changes"
git push origin feature/description-of-feature
```

## Code Style

### TypeScript

- Use explicit types, avoid `any`
- Use `const` by default, `let` only when needed
- Use arrow functions for callbacks
- Use template literals for strings
- Use destructuring for props and imports

### React Components

- Functional components only (no class components)
- Custom hooks for shared logic
- Use `React.ReactNode` for children
- Use event handlers as `const` arrow functions

Example:

```typescript
interface ComponentProps {
  title: string;
  children: React.ReactNode;
  onClose?: () => void;
}

export function Component({ title, children, onClose }: ComponentProps) {
  const handleClick = () => {
    onClose?.();
  };

  return (
    <div onClick={handleClick}>
      <h1>{title}</h1>
      {children}
    </div>
  );
}
```

### Styling

- Use Tailwind CSS for styling
- Create reusable component classes in `src/styles/globals.css` if needed
- Use CSS custom properties for theme colors (defined in Arc Design Tokens)
- Avoid inline styles except for dynamic layout values

### Component Organization

Keep files focused and under 400 lines:

```
components/
├── section-name/
│   ├── ComponentName.tsx      # Main component (50-150 lines)
│   ├── SubComponent.tsx       # Related sub-components
│   └── types.ts               # TypeScript interfaces for the section
└── shared/
    └── CommonComponent.tsx    # Reusable across sections
```

### Imports

- Group imports: external packages, then local modules
- Use path aliases (`@/`) for imports from `src/`
- Use relative imports for sibling components

```typescript
// External packages
import { useState } from 'react';
import { motion } from 'framer-motion';

// Local modules
import { useActiveSection } from '@/hooks/useActiveSection';
import { Header } from './Header';
```

## Component Showcase Updates

The showcase displays Arc components. To add or update a component showcase:

### 1. Update Component Registry

Edit `src/data/component-registry.ts`:

```typescript
export const COMPONENTS: ComponentDefinition[] = [
  {
    id: 'component-name',
    name: 'Component Name',
    category: 'Inputs' | 'Feedback' | 'Navigation' | 'Layout',
    description: 'Brief description of the component',
    props: [
      {
        name: 'propName',
        type: 'string | number',
        required: true,
        description: 'Prop description',
      },
    ],
  },
];
```

### 2. Add Code Snippets

Create or update code examples in `src/data/snippets/`:

```typescript
// src/data/snippets/component-name.ts
export const componentNameSnippets = {
  react: `import { ArcComponent } from '@arctech/core/react';\n\nexport function Example() {\n  return <ArcComponent prop="value" />;\n}`,
  vue: `<template>\n  <arc-component prop="value" />\n</template>`,
  angular: `import { ArcComponent } from '@arctech/core/angular';\n\n@Component({\n  template: '<arc-component [prop]="value"></arc-component>',\n})\nexport class ExampleComponent {\n  value = 'value';\n}`,
  svelte: `<script>\n  import ArcComponent from '@arctech/core/svelte';\n</script>\n\n<ArcComponent prop="value" />`,
};
```

### 3. Update ComponentExplorer

The `ComponentExplorer` component automatically renders all components from the registry. No manual updates needed.

## Testing

### Manual Testing

1. Run the dev server: `pnpm run dev`
2. Visit `http://localhost:5173`
3. Test your changes in browser
4. Test both light and dark themes (use the theme toggle)
5. Test on different screen sizes (responsive design)

### Responsive Design Testing

The showcase is mobile-responsive:
- Desktop: Full layout with sidebar
- Tablet: Collapsed sidebar
- Mobile: Stacked layout

Use browser DevTools to test different screen sizes.

### Theme Testing

- Light theme (toggle in header)
- Dark theme (default)
- Verify theme persists on page reload (stored in localStorage)

### Cross-browser Testing

Test in:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Committing Changes

### Commit Message Format

Use conventional commits:

```
<type>: <description>

<optional body>
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `refactor`: Code restructuring (no feature change)
- `perf`: Performance improvement
- `test`: Test changes
- `chore`: Build, dependencies, tooling

Examples:

```
feat: add Button component showcase

docs: update README with environment variables

fix: correct theme toggle in Safari

refactor: extract common component logic
```

### Before Committing

- [ ] Run `pnpm run build` - no TypeScript errors
- [ ] Check `git diff` - review all changes
- [ ] Run tests (manual testing on `pnpm run dev`)
- [ ] Verify responsive design
- [ ] Check light/dark theme

### Push and Create PR

```bash
git push origin feature/description
```

Create a pull request with:
- Clear description of changes
- Motivation for the change
- How to test the changes
- Screenshots for UI changes

## Common Tasks

### Add a New Component Section

1. Create component files in `src/components/showcase/`
2. Add component to registry in `src/data/component-registry.ts`
3. Create code snippets in `src/data/snippets/`
4. Test in dev server
5. Commit with message: `feat: add [Component] showcase`

### Update Component Props

1. Edit component definition in `src/data/component-registry.ts`
2. Update code snippets to reflect new props
3. Update component preview code in showcase section
4. Test in dev server
5. Commit with message: `feat: update [Component] props`

### Fix a Bug

1. Create feature branch: `git checkout -b fix/bug-description`
2. Make changes
3. Test locally: `pnpm run dev`
4. Build: `pnpm run build`
5. Commit: `git commit -m "fix: description of bug fix"`
6. Push and create PR

### Update Documentation

1. Edit `.md` files in project root or `docs/`
2. Keep documentation in sync with code
3. Run `pnpm run build` to verify no code changes break builds
4. Commit: `git commit -m "docs: description of documentation update"`

## Deployment

After changes are merged to main:

1. Automated CI/CD pipeline builds the project
2. Production build runs: `pnpm run build`
3. Artifacts deployed to hosting platform

To test production build locally:

```bash
pnpm run build
pnpm run preview
```

Visit `http://localhost:4173` to preview production build.

## Questions or Issues?

- Check existing issues on GitHub
- Review component registry for examples
- Look at similar components for patterns
- Check TypeScript error messages for guidance

Thank you for contributing!
