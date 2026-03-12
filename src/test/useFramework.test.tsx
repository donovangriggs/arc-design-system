import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FrameworkProvider, useFramework } from '@/hooks/useFramework';
import type { Framework } from '@/types';

// Helper component that exercises the context
function FrameworkDisplay() {
  const { framework, setFramework } = useFramework();
  return (
    <div>
      <span data-testid="current">{framework}</span>
      {(['react', 'vue', 'angular', 'svelte'] as Framework[]).map((fw) => (
        <button key={fw} onClick={() => setFramework(fw)}>
          {fw}
        </button>
      ))}
    </div>
  );
}

describe('FrameworkProvider + useFramework', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('defaults to react when localStorage is empty', () => {
    render(
      <FrameworkProvider>
        <FrameworkDisplay />
      </FrameworkProvider>,
    );
    expect(screen.getByTestId('current').textContent).toBe('react');
  });

  it('reads initial framework from localStorage', () => {
    localStorage.setItem('arc-design-system-framework', 'vue');
    render(
      <FrameworkProvider>
        <FrameworkDisplay />
      </FrameworkProvider>,
    );
    expect(screen.getByTestId('current').textContent).toBe('vue');
  });

  it('reads angular from localStorage', () => {
    localStorage.setItem('arc-design-system-framework', 'angular');
    render(
      <FrameworkProvider>
        <FrameworkDisplay />
      </FrameworkProvider>,
    );
    expect(screen.getByTestId('current').textContent).toBe('angular');
  });

  it('reads svelte from localStorage', () => {
    localStorage.setItem('arc-design-system-framework', 'svelte');
    render(
      <FrameworkProvider>
        <FrameworkDisplay />
      </FrameworkProvider>,
    );
    expect(screen.getByTestId('current').textContent).toBe('svelte');
  });

  it('ignores invalid values in localStorage and falls back to react', () => {
    localStorage.setItem('arc-design-system-framework', 'ember');
    render(
      <FrameworkProvider>
        <FrameworkDisplay />
      </FrameworkProvider>,
    );
    expect(screen.getByTestId('current').textContent).toBe('react');
  });

  it('updates framework state when setFramework is called', async () => {
    const user = userEvent.setup();
    render(
      <FrameworkProvider>
        <FrameworkDisplay />
      </FrameworkProvider>,
    );
    await user.click(screen.getByRole('button', { name: 'vue' }));
    expect(screen.getByTestId('current').textContent).toBe('vue');
  });

  it('persists selection to localStorage when setFramework is called', async () => {
    const user = userEvent.setup();
    render(
      <FrameworkProvider>
        <FrameworkDisplay />
      </FrameworkProvider>,
    );
    await user.click(screen.getByRole('button', { name: 'angular' }));
    expect(localStorage.getItem('arc-design-system-framework')).toBe('angular');
  });

  it('falls back to react when localStorage throws', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('SecurityError');
    });
    render(
      <FrameworkProvider>
        <FrameworkDisplay />
      </FrameworkProvider>,
    );
    expect(screen.getByTestId('current').textContent).toBe('react');
  });

  it('silently ignores localStorage write failure when setting svelte', async () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError');
    });
    const user = userEvent.setup();
    render(
      <FrameworkProvider>
        <FrameworkDisplay />
      </FrameworkProvider>,
    );
    await user.click(screen.getByRole('button', { name: 'svelte' }));
    expect(screen.getByTestId('current').textContent).toBe('svelte');
  });

  it('silently ignores localStorage write failure when setting angular', async () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError');
    });
    const user = userEvent.setup();
    render(
      <FrameworkProvider>
        <FrameworkDisplay />
      </FrameworkProvider>,
    );
    await user.click(screen.getByRole('button', { name: 'angular' }));
    expect(screen.getByTestId('current').textContent).toBe('angular');
  });

  it('silently ignores localStorage write failure when setting vue', async () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError');
    });
    const user = userEvent.setup();
    render(
      <FrameworkProvider>
        <FrameworkDisplay />
      </FrameworkProvider>,
    );
    await user.click(screen.getByRole('button', { name: 'vue' }));
    expect(screen.getByTestId('current').textContent).toBe('vue');
  });
});

describe('useFramework outside provider', () => {
  it('throws an error when used outside FrameworkProvider', () => {
    // Suppress the React error boundary console noise
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    function Standalone() {
      useFramework(); // should throw
      return null;
    }

    expect(() => render(<Standalone />)).toThrow(
      'useFramework must be used within a FrameworkProvider',
    );

    consoleSpy.mockRestore();
  });
});
