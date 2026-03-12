import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import type { Framework } from '@/types';

interface FrameworkContextValue {
  readonly framework: Framework;
  readonly setFramework: (f: Framework) => void;
}

const FrameworkContext = createContext<FrameworkContextValue | null>(null);

function getInitialFramework(): Framework {
  try {
    const stored = localStorage.getItem('arc-design-system-framework');
    if (stored === 'react' || stored === 'vue' || stored === 'angular' || stored === 'svelte') {
      return stored;
    }
  } catch {
    // localStorage unavailable
  }
  return 'react';
}

export function FrameworkProvider({ children }: { readonly children: ReactNode }) {
  const [framework, setFrameworkState] = useState<Framework>(getInitialFramework);

  const setFramework = useCallback((f: Framework) => {
    setFrameworkState(f);
    try {
      localStorage.setItem('arc-design-system-framework', f);
    } catch {
      // localStorage unavailable
    }
  }, []);

  const value = useMemo(() => ({ framework, setFramework }), [framework, setFramework]);

  return (
    <FrameworkContext value={value}>
      {children}
    </FrameworkContext>
  );
}

export function useFramework(): FrameworkContextValue {
  const ctx = useContext(FrameworkContext);
  if (ctx === null) {
    throw new Error('useFramework must be used within a FrameworkProvider');
  }
  return ctx;
}
