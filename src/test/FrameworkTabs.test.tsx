import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FrameworkProvider } from '@/hooks/useFramework';
import { FrameworkTabs } from '@/components/showcase/FrameworkTabs';

function renderWithProvider() {
  return render(
    <FrameworkProvider>
      <FrameworkTabs />
    </FrameworkProvider>,
  );
}

describe('FrameworkTabs', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders a tablist with aria-label', () => {
    renderWithProvider();
    expect(screen.getByRole('tablist', { name: /framework selector/i })).toBeInTheDocument();
  });

  it('renders four tabs', () => {
    renderWithProvider();
    expect(screen.getAllByRole('tab')).toHaveLength(4);
  });

  it('renders tabs for React, Vue, Angular, and Svelte', () => {
    renderWithProvider();
    expect(screen.getByRole('tab', { name: /react/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /vue/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /angular/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /svelte/i })).toBeInTheDocument();
  });

  it('marks React tab as selected by default', () => {
    renderWithProvider();
    expect(screen.getByRole('tab', { name: /react/i })).toHaveAttribute(
      'aria-selected',
      'true',
    );
  });

  it('marks other tabs as not selected by default', () => {
    renderWithProvider();
    for (const name of ['Vue', 'Angular', 'Svelte']) {
      expect(
        screen.getByRole('tab', { name: new RegExp(name, 'i') }),
      ).toHaveAttribute('aria-selected', 'false');
    }
  });

  it('selects the Vue tab when clicked', async () => {
    const user = userEvent.setup();
    renderWithProvider();

    await user.click(screen.getByRole('tab', { name: /vue/i }));

    expect(screen.getByRole('tab', { name: /vue/i })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    expect(screen.getByRole('tab', { name: /react/i })).toHaveAttribute(
      'aria-selected',
      'false',
    );
  });

  it('only one tab is selected at a time', async () => {
    const user = userEvent.setup();
    renderWithProvider();

    await user.click(screen.getByRole('tab', { name: /angular/i }));

    const selected = screen
      .getAllByRole('tab')
      .filter((tab) => tab.getAttribute('aria-selected') === 'true');

    expect(selected).toHaveLength(1);
    expect(selected[0]).toHaveAccessibleName(/angular/i);
  });

  it('persists selection to localStorage via context', async () => {
    const user = userEvent.setup();
    renderWithProvider();

    await user.click(screen.getByRole('tab', { name: /svelte/i }));

    expect(localStorage.getItem('arc-design-system-framework')).toBe('svelte');
  });

  it('pre-selects the tab matching the stored framework', () => {
    localStorage.setItem('arc-design-system-framework', 'angular');
    renderWithProvider();

    expect(screen.getByRole('tab', { name: /angular/i })).toHaveAttribute(
      'aria-selected',
      'true',
    );
  });
});
