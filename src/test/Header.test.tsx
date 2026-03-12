import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from '@/components/layout/Header';

describe('Header', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('renders a header element', () => {
    render(<Header />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('renders the Arc Design System brand name', () => {
    render(<Header />);
    expect(screen.getByText('Arc Design System')).toBeInTheDocument();
  });

  it('renders the Documentation link', () => {
    render(<Header />);
    expect(screen.getByRole('link', { name: /documentation/i })).toBeInTheDocument();
  });

  it('renders the GitHub link', () => {
    render(<Header />);
    expect(screen.getByRole('link', { name: /github/i })).toBeInTheDocument();
  });

  it('Documentation link opens in a new tab', () => {
    render(<Header />);
    const link = screen.getByRole('link', { name: /documentation/i });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('GitHub link opens in a new tab', () => {
    render(<Header />);
    const link = screen.getByRole('link', { name: /github/i });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders the ThemeToggle button', () => {
    render(<Header />);
    // ThemeToggle renders a button with aria-label "Switch to ..."
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
