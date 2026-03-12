import { BookOpen, Github } from 'lucide-react';
import { ThemeToggle } from '@/components/shared/ThemeToggle';

export function Header() {
  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        borderBottom: '1px solid var(--arc-color-neutral-200)',
        background: 'var(--arc-color-neutral-0)',
      }}
    >
      {/* Purple gradient accent line */}
      <div
        style={{
          height: 3,
          background: 'linear-gradient(90deg, var(--arc-color-primary-500), var(--arc-color-secondary-500))',
        }}
      />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 60,
          padding: '0 24px',
          maxWidth: 1400,
          margin: '0 auto',
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: 'linear-gradient(135deg, var(--arc-color-primary-500), var(--arc-color-secondary-500))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 700,
              fontSize: 16,
            }}
          >
            A
          </div>
          <span
            style={{
              fontWeight: 700,
              fontSize: 18,
              color: 'var(--arc-color-neutral-900)',
            }}
          >
            Arc Design System
          </span>
        </div>

        {/* Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <a
            href={import.meta.env.VITE_STORYBOOK_URL ?? '#'}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--arc-color-neutral-500)', padding: 8, display: 'flex' }}
            aria-label="Documentation"
            title="Documentation"
          >
            <BookOpen size={20} />
          </a>
          <a
            href={import.meta.env.VITE_GITHUB_URL ?? '#'}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--arc-color-neutral-500)', padding: 8, display: 'flex' }}
            aria-label="GitHub"
            title="GitHub"
          >
            <Github size={20} />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
