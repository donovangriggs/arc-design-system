/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_STORYBOOK_URL: string;
  readonly VITE_GITHUB_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

import 'react';

type ArcElement = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Record<string, unknown>;

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'arc-button': ArcElement;
      'arc-card': ArcElement;
      'arc-input': ArcElement;
      'arc-badge': ArcElement;
      'arc-avatar': ArcElement;
      'arc-modal': ArcElement;
      'arc-alert': ArcElement;
      'arc-tooltip': ArcElement;
      'arc-icon': ArcElement;
      'arc-theme-provider': ArcElement;
    }
  }
}
