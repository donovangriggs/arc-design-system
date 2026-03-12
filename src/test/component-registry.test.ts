import { describe, it, expect } from 'vitest';
import { COMPONENTS } from '@/data/component-registry';

describe('COMPONENTS registry', () => {
  it('is a non-empty array', () => {
    expect(Array.isArray(COMPONENTS)).toBe(true);
    expect(COMPONENTS.length).toBeGreaterThan(0);
  });

  it('contains at least 10 components', () => {
    expect(COMPONENTS.length).toBeGreaterThanOrEqual(10);
  });

  it('every component has required fields', () => {
    for (const comp of COMPONENTS) {
      expect(comp.id).toBeTruthy();
      expect(comp.name).toBeTruthy();
      expect(comp.tagName).toBeTruthy();
      expect(comp.description).toBeTruthy();
      expect(comp.category).toBeTruthy();
      expect(Array.isArray(comp.props)).toBe(true);
    }
  });

  it('all component ids are unique', () => {
    const ids = COMPONENTS.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('all tagNames start with arc-', () => {
    for (const comp of COMPONENTS) {
      expect(comp.tagName).toMatch(/^arc-/);
    }
  });

  it('categories are valid union members', () => {
    const validCategories = new Set([
      'action',
      'layout',
      'form',
      'feedback',
      'data-display',
      'utility',
    ]);
    for (const comp of COMPONENTS) {
      expect(validCategories.has(comp.category)).toBe(true);
    }
  });

  it('every prop has name, type, default, and description', () => {
    for (const comp of COMPONENTS) {
      for (const prop of comp.props) {
        expect(prop.name).toBeTruthy();
        expect(prop.type).toBeTruthy();
        expect(typeof prop.default).toBe('string');
        expect(prop.description).toBeTruthy();
      }
    }
  });

  it('arc-button has variant, size, disabled, loading, and type props', () => {
    const button = COMPONENTS.find((c) => c.id === 'arc-button');
    expect(button).toBeDefined();
    const propNames = button!.props.map((p) => p.name);
    expect(propNames).toContain('variant');
    expect(propNames).toContain('size');
    expect(propNames).toContain('disabled');
    expect(propNames).toContain('loading');
    expect(propNames).toContain('type');
  });

  it('arc-button is in the action category', () => {
    const button = COMPONENTS.find((c) => c.id === 'arc-button');
    expect(button?.category).toBe('action');
  });

  it('arc-theme-provider is in the utility category', () => {
    const tp = COMPONENTS.find((c) => c.id === 'arc-theme-provider');
    expect(tp?.category).toBe('utility');
  });

  it('arc-modal has open, size, closeOnOverlay, and closeOnEscape props', () => {
    const modal = COMPONENTS.find((c) => c.id === 'arc-modal');
    expect(modal).toBeDefined();
    const propNames = modal!.props.map((p) => p.name);
    expect(propNames).toContain('open');
    expect(propNames).toContain('size');
    expect(propNames).toContain('closeOnOverlay');
    expect(propNames).toContain('closeOnEscape');
  });
});
