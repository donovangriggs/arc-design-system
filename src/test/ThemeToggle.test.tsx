import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeToggle } from '@/components/shared/ThemeToggle';

describe('ThemeToggle', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    vi.restoreAllMocks();
  });

  it('renders a toggle button', () => {
    render(<ThemeToggle />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('defaults to dark theme when localStorage is empty', () => {
    render(<ThemeToggle />);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('reads stored dark preference from localStorage', () => {
    localStorage.setItem('arc-theme', 'dark');
    render(<ThemeToggle />);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('reads stored light preference from localStorage', () => {
    localStorage.setItem('arc-theme', 'light');
    render(<ThemeToggle />);
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('shows Sun icon when theme is dark (toggle would switch to light)', () => {
    localStorage.setItem('arc-theme', 'dark');
    render(<ThemeToggle />);
    expect(screen.getByTestId('icon-sun')).toBeInTheDocument();
  });

  it('shows Moon icon when theme is light', () => {
    localStorage.setItem('arc-theme', 'light');
    render(<ThemeToggle />);
    expect(screen.getByTestId('icon-moon')).toBeInTheDocument();
  });

  it('toggles from dark to light on click', async () => {
    const user = userEvent.setup();
    localStorage.setItem('arc-theme', 'dark');
    render(<ThemeToggle />);

    await user.click(screen.getByRole('button'));

    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('toggles from light to dark on click', async () => {
    const user = userEvent.setup();
    localStorage.setItem('arc-theme', 'light');
    render(<ThemeToggle />);

    await user.click(screen.getByRole('button'));

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('persists theme selection to localStorage', async () => {
    const user = userEvent.setup();
    localStorage.setItem('arc-theme', 'dark');
    render(<ThemeToggle />);

    await user.click(screen.getByRole('button'));

    expect(localStorage.getItem('arc-theme')).toBe('light');
  });

  it('has a descriptive aria-label on the button (dark mode)', () => {
    localStorage.setItem('arc-theme', 'dark');
    render(<ThemeToggle />);
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-label',
      'Switch to light mode',
    );
  });

  it('has a descriptive aria-label on the button (light mode)', () => {
    localStorage.setItem('arc-theme', 'light');
    render(<ThemeToggle />);
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-label',
      'Switch to dark mode',
    );
  });

  it('aria-label updates after toggle', async () => {
    const user = userEvent.setup();
    localStorage.setItem('arc-theme', 'dark');
    render(<ThemeToggle />);

    await user.click(screen.getByRole('button'));

    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-label',
      'Switch to dark mode',
    );
  });

  it('falls back to dark when localStorage throws on read', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('SecurityError');
    });
    render(<ThemeToggle />);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('silently ignores localStorage write failure', async () => {
    const user = userEvent.setup();
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError');
    });
    render(<ThemeToggle />);
    // Should not throw; theme should still toggle in state
    await user.click(screen.getByRole('button'));
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });
});
