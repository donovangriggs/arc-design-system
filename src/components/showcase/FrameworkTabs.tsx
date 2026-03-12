import { useFramework } from '@/hooks/useFramework';
import { FRAMEWORK_LABELS, FRAMEWORK_COLORS, type Framework } from '@/types';

const FRAMEWORKS: ReadonlyArray<Framework> = ['react', 'vue', 'angular', 'svelte'];

export function FrameworkTabs() {
  const { framework, setFramework } = useFramework();

  return (
    <div
      role="tablist"
      aria-label="Framework selector"
      style={{
        display: 'flex',
        gap: 4,
        padding: 4,
        borderRadius: 12,
        background: 'var(--arc-color-neutral-100)',
        border: '1px solid var(--arc-color-neutral-200)',
      }}
    >
      {FRAMEWORKS.map((fw) => {
        const isActive = fw === framework;
        return (
          <button
            type="button"
            key={fw}
            role="tab"
            aria-selected={isActive}
            onClick={() => setFramework(fw)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 16px',
              borderRadius: 8,
              border: 'none',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: isActive ? 600 : 400,
              background: isActive ? 'var(--arc-color-neutral-0)' : 'transparent',
              color: isActive ? 'var(--arc-color-neutral-900)' : 'var(--arc-color-neutral-500)',
              boxShadow: isActive ? 'var(--arc-shadow-sm)' : 'none',
              transition: 'all 150ms',
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: isActive ? FRAMEWORK_COLORS[fw] : 'var(--arc-color-neutral-300)',
                transition: 'background 150ms',
              }}
            />
            {FRAMEWORK_LABELS[fw]}
          </button>
        );
      })}
    </div>
  );
}
