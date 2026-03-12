import { useMemo } from 'react';
import type { ComponentMeta } from '@/types';

interface SidebarNavProps {
  readonly components: ReadonlyArray<ComponentMeta>;
  readonly activeId: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  action: 'Action',
  layout: 'Layout',
  form: 'Form',
  feedback: 'Feedback',
  'data-display': 'Data Display',
  utility: 'Utility',
};

const CATEGORY_ORDER = ['action', 'layout', 'form', 'feedback', 'data-display', 'utility'];

export function SidebarNav({ components, activeId }: SidebarNavProps) {
  const grouped = useMemo(() => {
    const map = new Map<string, ComponentMeta[]>();
    for (const comp of components) {
      const list = map.get(comp.category) ?? [];
      map.set(comp.category, [...list, comp]);
    }
    return map;
  }, [components]);

  return (
    <nav
      aria-label="Component navigation"
      style={{
        position: 'sticky',
        top: 80,
        width: 220,
        maxHeight: 'calc(100vh - 100px)',
        overflowY: 'auto',
        padding: '16px 0',
      }}
    >
      {CATEGORY_ORDER.map((cat) => {
        const items = grouped.get(cat);
        if (!items) return null;
        return (
          <div key={cat} style={{ marginBottom: 20 }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: 'var(--arc-color-neutral-400)',
                padding: '0 12px',
                marginBottom: 6,
              }}
            >
              {CATEGORY_LABELS[cat]}
            </div>
            {items.map((comp) => {
              const isActive = comp.id === activeId;
              return (
                <button
                  type="button"
                  key={comp.id}
                  onClick={() => {
                    document.getElementById(comp.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    padding: '6px 12px',
                    fontSize: 14,
                    border: 'none',
                    cursor: 'pointer',
                    borderLeft: isActive ? '2px solid var(--arc-color-primary-500)' : '2px solid transparent',
                    background: isActive ? 'var(--arc-color-primary-50)' : 'transparent',
                    color: isActive ? 'var(--arc-color-primary-600)' : 'var(--arc-color-neutral-600)',
                    fontWeight: isActive ? 600 : 400,
                    borderRadius: '0 6px 6px 0',
                    transition: 'all 150ms',
                  }}
                >
                  {comp.name}
                </button>
              );
            })}
          </div>
        );
      })}
    </nav>
  );
}
