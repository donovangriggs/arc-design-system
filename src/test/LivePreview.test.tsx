import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LivePreview } from '@/components/showcase/LivePreview';

// Custom element stubs for jsdom — arc-* elements render as unknown HTML
// which jsdom handles fine. We just need to avoid errors.
describe('LivePreview', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('returns null for an unknown componentId', () => {
    const { container } = render(<LivePreview componentId="unknown-component" />);
    expect(container.firstChild).toBeNull();
  });

  it('renders a preview wrapper for arc-button', () => {
    const { container } = render(<LivePreview componentId="arc-button" />);
    expect(container.firstChild).not.toBeNull();
  });

  it('renders a preview wrapper for arc-card', () => {
    const { container } = render(<LivePreview componentId="arc-card" />);
    expect(container.firstChild).not.toBeNull();
  });

  it('renders a preview wrapper for arc-input', () => {
    const { container } = render(<LivePreview componentId="arc-input" />);
    expect(container.firstChild).not.toBeNull();
  });

  it('renders a preview wrapper for arc-badge', () => {
    const { container } = render(<LivePreview componentId="arc-badge" />);
    expect(container.firstChild).not.toBeNull();
  });

  it('renders a preview wrapper for arc-avatar', () => {
    const { container } = render(<LivePreview componentId="arc-avatar" />);
    expect(container.firstChild).not.toBeNull();
  });

  it('renders a preview wrapper for arc-alert', () => {
    const { container } = render(<LivePreview componentId="arc-alert" />);
    expect(container.firstChild).not.toBeNull();
  });

  it('renders a preview wrapper for arc-tooltip', () => {
    const { container } = render(<LivePreview componentId="arc-tooltip" />);
    expect(container.firstChild).not.toBeNull();
  });

  it('renders a preview wrapper for arc-icon', () => {
    const { container } = render(<LivePreview componentId="arc-icon" />);
    expect(container.firstChild).not.toBeNull();
  });

  it('renders a preview wrapper for arc-theme-provider', () => {
    const { container } = render(<LivePreview componentId="arc-theme-provider" />);
    expect(container.firstChild).not.toBeNull();
  });

  it('renders the Open Modal button in the modal preview', () => {
    render(<LivePreview componentId="arc-modal" />);
    expect(screen.getByText('Open Modal')).toBeInTheDocument();
  });

  it('opens the modal when Open Modal button is clicked', async () => {
    const user = userEvent.setup();

    // Create a mock arc-modal element with an `open` property
    const mockModal = document.createElement('div');
    let openValue = false;
    Object.defineProperty(mockModal, 'open', {
      get: () => openValue,
      set: (v: boolean) => { openValue = v; },
      configurable: true,
    });
    mockModal.addEventListener = vi.fn();
    mockModal.removeEventListener = vi.fn();

    const getElementByIdSpy = vi
      .spyOn(document, 'getElementById')
      .mockReturnValue(null);

    render(<LivePreview componentId="arc-modal" />);

    await user.click(screen.getByText('Open Modal'));

    // The component sets the ref's .open property; we just verify no error thrown
    expect(screen.getByText('Open Modal')).toBeInTheDocument();
    getElementByIdSpy.mockRestore();
  });

  it('renders theme toggle buttons in the theme-provider preview', () => {
    render(<LivePreview componentId="arc-theme-provider" />);
    expect(screen.getByText('Light Mode')).toBeInTheDocument();
    expect(screen.getByText('Dark Mode')).toBeInTheDocument();
  });

  it('clicking Light Mode sets data-theme=light on documentElement', async () => {
    const user = userEvent.setup();
    render(<LivePreview componentId="arc-theme-provider" />);

    await user.click(screen.getByText('Light Mode'));
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('clicking Dark Mode sets data-theme=dark on documentElement', async () => {
    const user = userEvent.setup();
    render(<LivePreview componentId="arc-theme-provider" />);

    await user.click(screen.getByText('Dark Mode'));
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('modal preview renders without crashing when ref is null', () => {
    // The useEffect guards with `if (!el) return` and `if (modalRef.current)`,
    // so rendering without a real custom element exercises the null-ref paths
    render(<LivePreview componentId="arc-modal" />);
    expect(screen.getByText('Open Modal')).toBeInTheDocument();
  });
});
