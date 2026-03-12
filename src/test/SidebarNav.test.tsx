import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SidebarNav } from '@/components/layout/SidebarNav';
import type { ComponentMeta } from '@/types';

const mockComponents: ComponentMeta[] = [
  {
    id: 'arc-button',
    name: 'Button',
    tagName: 'arc-button',
    description: 'A button',
    category: 'action',
    props: [],
  },
  {
    id: 'arc-card',
    name: 'Card',
    tagName: 'arc-card',
    description: 'A card',
    category: 'layout',
    props: [],
  },
  {
    id: 'arc-input',
    name: 'Input',
    tagName: 'arc-input',
    description: 'An input',
    category: 'form',
    props: [],
  },
  {
    id: 'arc-alert',
    name: 'Alert',
    tagName: 'arc-alert',
    description: 'An alert',
    category: 'feedback',
    props: [],
  },
  {
    id: 'arc-badge',
    name: 'Badge',
    tagName: 'arc-badge',
    description: 'A badge',
    category: 'data-display',
    props: [],
  },
  {
    id: 'arc-theme-provider',
    name: 'Theme Provider',
    tagName: 'arc-theme-provider',
    description: 'Theme provider',
    category: 'utility',
    props: [],
  },
];

describe('SidebarNav', () => {
  it('renders a navigation landmark', () => {
    render(<SidebarNav components={mockComponents} activeId="" />);
    expect(screen.getByRole('navigation', { name: /component navigation/i })).toBeInTheDocument();
  });

  it('renders a button for each component', () => {
    render(<SidebarNav components={mockComponents} activeId="" />);
    expect(screen.getByRole('button', { name: /button/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /card/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /input/i })).toBeInTheDocument();
  });

  it('renders all 6 category labels', () => {
    render(<SidebarNav components={mockComponents} activeId="" />);
    expect(screen.getByText('Action')).toBeInTheDocument();
    expect(screen.getByText('Layout')).toBeInTheDocument();
    expect(screen.getByText('Form')).toBeInTheDocument();
    expect(screen.getByText('Feedback')).toBeInTheDocument();
    expect(screen.getByText('Data Display')).toBeInTheDocument();
    expect(screen.getByText('Utility')).toBeInTheDocument();
  });

  it('applies active styling to the active component button', () => {
    render(<SidebarNav components={mockComponents} activeId="arc-button" />);
    const buttonEl = screen.getByRole('button', { name: /^button$/i });
    // Active button has fontWeight 600 in inline style
    expect(buttonEl).toHaveStyle({ fontWeight: 600 });
  });

  it('non-active components do not have active styling', () => {
    render(<SidebarNav components={mockComponents} activeId="arc-button" />);
    const cardBtn = screen.getByRole('button', { name: /^card$/i });
    expect(cardBtn).toHaveStyle({ fontWeight: 400 });
  });

  it('calls scrollIntoView when a nav button is clicked', async () => {
    const user = userEvent.setup();
    const el = document.createElement('section');
    el.id = 'arc-button';
    const scrollIntoViewMock = vi.fn();
    el.scrollIntoView = scrollIntoViewMock;
    document.body.appendChild(el);

    render(<SidebarNav components={mockComponents} activeId="" />);
    await user.click(screen.getByRole('button', { name: /^button$/i }));

    expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth' });

    el.remove();
  });

  it('renders an empty nav when components array is empty', () => {
    render(<SidebarNav components={[]} activeId="" />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('skips category groups for categories not present in component list', () => {
    const onlyAction: ComponentMeta[] = [mockComponents[0]!];
    render(<SidebarNav components={onlyAction} activeId="" />);
    expect(screen.getByText('Action')).toBeInTheDocument();
    expect(screen.queryByText('Layout')).not.toBeInTheDocument();
  });

  it('groups multiple components under the same category', () => {
    const twoActions: ComponentMeta[] = [
      mockComponents[0]!,
      { ...mockComponents[0]!, id: 'arc-link', name: 'Link', tagName: 'arc-link' },
    ];
    render(<SidebarNav components={twoActions} activeId="" />);
    // Only one "Action" label for both
    expect(screen.getAllByText('Action')).toHaveLength(1);
    expect(screen.getByRole('button', { name: /link/i })).toBeInTheDocument();
  });
});
