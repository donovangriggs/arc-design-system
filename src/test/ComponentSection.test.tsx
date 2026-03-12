import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ComponentSection } from '@/components/showcase/ComponentSection';
import { FrameworkProvider } from '@/hooks/useFramework';
import type { ComponentMeta, FrameworkSnippets } from '@/types';

const meta: ComponentMeta = {
  id: 'arc-button',
  name: 'Button',
  tagName: 'arc-button',
  description: 'A versatile button component.',
  category: 'action',
  props: [
    { name: 'variant', type: 'string', default: "'primary'", description: 'Visual variant' },
  ],
};

const snippets: FrameworkSnippets = {
  react: '<arc-button>Click</arc-button>',
  vue: '<arc-button>Click</arc-button>',
  angular: '<arc-button>Click</arc-button>',
  svelte: '<arc-button>Click</arc-button>',
};

function renderSection(overrideMeta = meta, overrideSnippets = snippets) {
  return render(
    <FrameworkProvider>
      <ComponentSection meta={overrideMeta} snippets={overrideSnippets} />
    </FrameworkProvider>,
  );
}

describe('ComponentSection', () => {
  it('renders a section element with the component id', () => {
    renderSection();
    expect(document.getElementById('arc-button')).toBeInTheDocument();
  });

  it('renders the component name as a heading', () => {
    renderSection();
    expect(screen.getByRole('heading', { name: /button/i })).toBeInTheDocument();
  });

  it('renders the tagName in a code element', () => {
    renderSection();
    expect(screen.getByText(/<arc-button>/)).toBeInTheDocument();
  });

  it('renders the component description', () => {
    renderSection();
    expect(screen.getByText('A versatile button component.')).toBeInTheDocument();
  });

  it('renders the PropsTable when props are provided', () => {
    renderSection();
    // PropsTable renders a table
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('does not render a table when the component has no props', () => {
    const noProps: ComponentMeta = { ...meta, props: [] };
    renderSection(noProps);
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  it('renders the CodePanel (copy button is present)', async () => {
    renderSection();
    const copyBtn = await screen.findByRole('button', { name: /copy/i });
    expect(copyBtn).toBeInTheDocument();
  });
});
