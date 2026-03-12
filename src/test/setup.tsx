import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock framer-motion to avoid animation complexity in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }) => {
      const { initial: _i, animate: _a, transition: _t, ...rest } = props as Record<string, unknown>;
      return <div {...(rest as React.HTMLAttributes<HTMLDivElement>)}>{children}</div>;
    },
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock shiki to avoid async heavy loading in tests
vi.mock('shiki', () => ({
  codeToHtml: vi.fn().mockResolvedValue('<pre><code>mocked</code></pre>'),
}));

// Mock lucide-react icons to simple spans
vi.mock('lucide-react', () => ({
  Moon: () => <span data-testid="icon-moon" aria-hidden="true" />,
  Sun: () => <span data-testid="icon-sun" aria-hidden="true" />,
  Check: () => <span data-testid="icon-check" aria-hidden="true" />,
  Clipboard: () => <span data-testid="icon-clipboard" aria-hidden="true" />,
  BookOpen: () => <span data-testid="icon-book-open" aria-hidden="true" />,
  Github: () => <span data-testid="icon-github" aria-hidden="true" />,
  ArrowRight: () => <span data-testid="icon-arrow-right" aria-hidden="true" />,
  Package: () => <span data-testid="icon-package" aria-hidden="true" />,
  Layers: () => <span data-testid="icon-layers" aria-hidden="true" />,
}));
