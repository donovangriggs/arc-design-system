import { describe, it, expect } from 'vitest';
import {
  FRAMEWORK_LABELS,
  FRAMEWORK_COLORS,
  FRAMEWORK_LANGS,
} from '@/types';
import type { Framework, FrameworkSnippets, PropDefinition, ComponentMeta } from '@/types';

describe('FRAMEWORK_LABELS', () => {
  it('has a label for every framework', () => {
    const frameworks: Framework[] = ['react', 'vue', 'angular', 'svelte'];
    for (const fw of frameworks) {
      expect(FRAMEWORK_LABELS[fw]).toBeTruthy();
    }
  });

  it('maps react to React', () => {
    expect(FRAMEWORK_LABELS['react']).toBe('React');
  });

  it('maps vue to Vue', () => {
    expect(FRAMEWORK_LABELS['vue']).toBe('Vue');
  });

  it('maps angular to Angular', () => {
    expect(FRAMEWORK_LABELS['angular']).toBe('Angular');
  });

  it('maps svelte to Svelte', () => {
    expect(FRAMEWORK_LABELS['svelte']).toBe('Svelte');
  });
});

describe('FRAMEWORK_COLORS', () => {
  it('has a hex color for every framework', () => {
    const frameworks: Framework[] = ['react', 'vue', 'angular', 'svelte'];
    const hexPattern = /^#[0-9a-f]{3,8}$/i;
    for (const fw of frameworks) {
      expect(FRAMEWORK_COLORS[fw]).toMatch(hexPattern);
    }
  });

  it('react color is the canonical React blue', () => {
    expect(FRAMEWORK_COLORS['react']).toBe('#61dafb');
  });
});

describe('FRAMEWORK_LANGS', () => {
  it('has a language identifier for every framework', () => {
    const frameworks: Framework[] = ['react', 'vue', 'angular', 'svelte'];
    for (const fw of frameworks) {
      expect(FRAMEWORK_LANGS[fw]).toBeTruthy();
    }
  });

  it('react uses tsx', () => {
    expect(FRAMEWORK_LANGS['react']).toBe('tsx');
  });

  it('angular uses typescript', () => {
    expect(FRAMEWORK_LANGS['angular']).toBe('typescript');
  });

  it('vue uses vue', () => {
    expect(FRAMEWORK_LANGS['vue']).toBe('vue');
  });

  it('svelte uses svelte', () => {
    expect(FRAMEWORK_LANGS['svelte']).toBe('svelte');
  });
});

describe('type shapes (structural)', () => {
  it('FrameworkSnippets covers all four frameworks', () => {
    const snippets: FrameworkSnippets = {
      react: 'r',
      vue: 'v',
      angular: 'a',
      svelte: 's',
    };
    expect(Object.keys(snippets)).toHaveLength(4);
  });

  it('PropDefinition has required fields', () => {
    const prop: PropDefinition = {
      name: 'variant',
      type: 'string',
      default: "'primary'",
      description: 'Visual variant',
    };
    expect(prop.name).toBe('variant');
    expect(prop.type).toBe('string');
    expect(prop.default).toBe("'primary'");
    expect(prop.description).toBe('Visual variant');
  });

  it('ComponentMeta has required fields and category union', () => {
    const meta: ComponentMeta = {
      id: 'arc-button',
      name: 'Button',
      tagName: 'arc-button',
      description: 'A button component',
      category: 'action',
      props: [],
    };
    expect(meta.id).toBe('arc-button');
    expect(meta.category).toBe('action');
  });
});
