import { useMemo } from 'react';
import { Header } from '@/components/layout/Header';
import { SidebarNav } from '@/components/layout/SidebarNav';
import { HeroSection } from '@/components/hero/HeroSection';
import { ComponentExplorer } from '@/components/showcase/ComponentExplorer';
import { COMPONENTS } from '@/data/component-registry';
import { useActiveSection } from '@/hooks/useActiveSection';

const MAX_CONTENT_WIDTH = 1400;
const CONTENT_PADDING = 24;
const SIDEBAR_GAP = 32;

export function App() {
  const sectionIds = useMemo(() => COMPONENTS.map((c) => c.id), []);
  const activeId = useActiveSection(sectionIds);

  return (
    <>
      <Header />
      <HeroSection />

      <div
        style={{
          display: 'flex',
          maxWidth: MAX_CONTENT_WIDTH,
          margin: '0 auto',
          padding: `0 ${CONTENT_PADDING}px`,
          gap: SIDEBAR_GAP,
        }}
      >
        {/* Sidebar — hidden on small screens via media query */}
        <div className="sidebar-container">
          <SidebarNav components={COMPONENTS} activeId={activeId} />
        </div>

        {/* Main content */}
        <main style={{ flex: 1, minWidth: 0 }}>
          <ComponentExplorer />
        </main>
      </div>
    </>
  );
}
