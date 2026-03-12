import type { ComponentMeta, FrameworkSnippets } from '@/types';
import { LivePreview } from './LivePreview';
import { CodePanel } from './CodePanel';
import { PropsTable } from './PropsTable';

interface ComponentSectionProps {
  readonly meta: ComponentMeta;
  readonly snippets: FrameworkSnippets;
}

export function ComponentSection({ meta, snippets }: ComponentSectionProps) {
  return (
    <section
      id={meta.id}
      className="animate-fade-in"
      style={{
        padding: '48px 0',
        borderBottom: '1px solid var(--arc-color-neutral-100)',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <h2
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: 'var(--arc-color-neutral-900)',
              margin: 0,
            }}
          >
            {meta.name}
          </h2>
          <code
            style={{
              fontSize: 12,
              padding: '2px 8px',
              borderRadius: 6,
              background: 'var(--arc-color-neutral-100)',
              color: 'var(--arc-color-neutral-500)',
              fontFamily: 'var(--arc-font-family-mono)',
            }}
          >
            {'<'}{meta.tagName}{'>'}
          </code>
        </div>
        <p
          style={{
            fontSize: 15,
            color: 'var(--arc-color-neutral-600)',
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          {meta.description}
        </p>
      </div>

      {/* Preview + Code grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: 20,
          marginBottom: 24,
        }}
      >
        <LivePreview componentId={meta.id} />
        <CodePanel snippets={snippets} />
      </div>

      {/* Props table */}
      <PropsTable props={meta.props} />
    </section>
  );
}
