import { useState, useRef, useEffect } from 'react';

interface LivePreviewProps {
  readonly componentId: string;
}

interface ArcModalElement extends HTMLElement {
  open: boolean;
}

function ButtonPreview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <arc-button variant="primary">Primary</arc-button>
        <arc-button variant="secondary">Secondary</arc-button>
        <arc-button variant="outline">Outline</arc-button>
        <arc-button variant="ghost">Ghost</arc-button>
        <arc-button variant="destructive">Destructive</arc-button>
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <arc-button variant="primary" size="sm">Small</arc-button>
        <arc-button variant="primary" size="md">Medium</arc-button>
        <arc-button variant="primary" size="lg">Large</arc-button>
        <arc-button variant="primary" loading>Loading</arc-button>
      </div>
    </div>
  );
}

function CardPreview() {
  return (
    <div style={{ maxWidth: 360 }}>
      <arc-card variant="elevated" padding="lg">
        <div slot="header" style={{ fontWeight: 600, fontSize: 16 }}>Card Title</div>
        <p style={{ color: 'var(--arc-color-neutral-600)', margin: '8px 0' }}>
          This is the card body with supporting text and content.
        </p>
        <div slot="footer">
          <arc-button variant="primary" size="sm">Action</arc-button>
        </div>
      </arc-card>
    </div>
  );
}

function InputPreview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 320 }}>
      <arc-input label="Full Name" placeholder="Enter your name" type="text" />
      <arc-input label="Email" placeholder="you@example.com" type="email" helper-text="We'll never share your email" />
      <arc-input label="Password" type="password" error-message="Password is required" />
    </div>
  );
}

function BadgePreview() {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
      <arc-badge variant="primary">Primary</arc-badge>
      <arc-badge variant="secondary">Secondary</arc-badge>
      <arc-badge variant="success">Success</arc-badge>
      <arc-badge variant="warning">Warning</arc-badge>
      <arc-badge variant="error">Error</arc-badge>
      <arc-badge variant="info">Info</arc-badge>
      <arc-badge variant="info" dot>Online</arc-badge>
    </div>
  );
}

function AvatarPreview() {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <arc-avatar size="xs" name="XS" />
      <arc-avatar size="sm" name="SM" />
      <arc-avatar size="md" name="JD" />
      <arc-avatar size="lg" name="LG" />
      <arc-avatar size="xl" name="XL" shape="square" />
    </div>
  );
}

function ModalPreview() {
  const [modalOpen, setModalOpen] = useState(false);
  const modalRef = useRef<ArcModalElement>(null);

  useEffect(() => {
    const el = modalRef.current;
    if (!el) return;
    const handler = () => setModalOpen(false);
    el.addEventListener('arcClose', handler);
    return () => el.removeEventListener('arcClose', handler);
  }, []);

  useEffect(() => {
    if (modalRef.current) modalRef.current.open = modalOpen;
  }, [modalOpen]);

  return (
    <>
      <arc-button variant="primary" onClick={() => setModalOpen(true)}>
        Open Modal
      </arc-button>
      <arc-modal ref={modalRef} size="md" close-on-overlay close-on-escape>
        <div style={{ padding: 24 }}>
          <h3 style={{ marginTop: 0 }}>Modal Title</h3>
          <p style={{ color: 'var(--arc-color-neutral-600)' }}>
            This modal demonstrates overlay dismiss and escape key handling.
          </p>
          <arc-button variant="primary" onClick={() => setModalOpen(false)}>
            Close
          </arc-button>
        </div>
      </arc-modal>
    </>
  );
}

function AlertPreview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
      <arc-alert variant="info" alert-title="Info">Informational message.</arc-alert>
      <arc-alert variant="success" alert-title="Success">Operation completed.</arc-alert>
      <arc-alert variant="warning" alert-title="Warning">Please review.</arc-alert>
      <arc-alert variant="error" alert-title="Error">Something went wrong.</arc-alert>
    </div>
  );
}

const ICON_NAMES = ['check', 'plus', 'minus', 'search', 'heart', 'star', 'user', 'menu', 'info', 'chevron-right', 'chevron-up', 'chevron-down', 'chevron-left', 'x', 'alert-triangle'];

function TooltipPreview() {
  return (
    <div style={{ display: 'flex', gap: 12, padding: '40px 20px' }}>
      <arc-tooltip content="Top tooltip" position="top">
        <arc-button variant="outline">Top</arc-button>
      </arc-tooltip>
      <arc-tooltip content="Right tooltip" position="right">
        <arc-button variant="outline">Right</arc-button>
      </arc-tooltip>
      <arc-tooltip content="Bottom tooltip" position="bottom">
        <arc-button variant="outline">Bottom</arc-button>
      </arc-tooltip>
      <arc-tooltip content="Left tooltip" position="left">
        <arc-button variant="outline">Left</arc-button>
      </arc-tooltip>
    </div>
  );
}

function IconPreview() {
  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      {ICON_NAMES.map((name) => (
        <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <arc-icon name={name} size={24} color="var(--arc-color-primary-500)" />
          <span style={{ fontSize: 11, color: 'var(--arc-color-neutral-500)' }}>{name}</span>
        </div>
      ))}
    </div>
  );
}

function ThemeProviderPreview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
      <p style={{ fontSize: 14, color: 'var(--arc-color-neutral-600)', margin: 0 }}>
        The theme provider sets <code>data-theme</code> on the document root,
        enabling all components to switch between light and dark mode.
      </p>
      <div style={{ display: 'flex', gap: 8 }}>
        <arc-button variant="outline" onClick={() => document.documentElement.setAttribute('data-theme', 'light')}>
          Light Mode
        </arc-button>
        <arc-button variant="outline" onClick={() => document.documentElement.setAttribute('data-theme', 'dark')}>
          Dark Mode
        </arc-button>
      </div>
    </div>
  );
}

const PREVIEW_COMPONENTS: Record<string, React.ComponentType> = {
  'arc-button': ButtonPreview,
  'arc-card': CardPreview,
  'arc-input': InputPreview,
  'arc-badge': BadgePreview,
  'arc-avatar': AvatarPreview,
  'arc-modal': ModalPreview,
  'arc-alert': AlertPreview,
  'arc-tooltip': TooltipPreview,
  'arc-icon': IconPreview,
  'arc-theme-provider': ThemeProviderPreview,
};

export function LivePreview({ componentId }: LivePreviewProps) {
  const PreviewComponent = PREVIEW_COMPONENTS[componentId];
  if (!PreviewComponent) return null;

  return (
    <div
      className="preview-grid"
      style={{
        padding: 24,
        borderRadius: 12,
        border: '1px solid var(--arc-color-neutral-200)',
        background: 'var(--arc-color-neutral-0)',
        minHeight: 120,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <PreviewComponent />
    </div>
  );
}
