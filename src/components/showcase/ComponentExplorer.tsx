import { FrameworkProvider } from '@/hooks/useFramework';
import { FrameworkTabs } from './FrameworkTabs';
import { ComponentSection } from './ComponentSection';
import { COMPONENTS } from '@/data/component-registry';
import { SNIPPETS } from '@/data/snippets';

const HEADER_HEIGHT = 63;
const SCROLL_MARGIN_TOP = 80;

export function ComponentExplorer() {
  return (
    <FrameworkProvider>
      <div id="explorer" style={{ scrollMarginTop: SCROLL_MARGIN_TOP }}>
        {/* Sticky framework tabs */}
        <div
          style={{
            position: 'sticky',
            top: HEADER_HEIGHT,
            zIndex: 40,
            padding: '16px 0',
            background: 'var(--arc-color-neutral-0)',
            borderBottom: '1px solid var(--arc-color-neutral-100)',
          }}
        >
          <FrameworkTabs />
        </div>

        {/* Component sections */}
        {COMPONENTS.map((comp) => {
          const snippets = SNIPPETS[comp.id];
          if (!snippets) return null;
          return (
            <ComponentSection key={comp.id} meta={comp} snippets={snippets} />
          );
        })}
      </div>
    </FrameworkProvider>
  );
}
