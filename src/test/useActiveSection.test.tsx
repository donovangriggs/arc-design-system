import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useActiveSection } from '@/hooks/useActiveSection';

// IntersectionObserver requires a constructor — we use a class mock
type IntersectionCallback = (entries: IntersectionObserverEntry[]) => void;

let capturedCallback: IntersectionCallback | null = null;
const observeSpy = vi.fn();
const disconnectSpy = vi.fn();

class MockIntersectionObserver {
  constructor(cb: IntersectionCallback, _options?: IntersectionObserverInit) {
    capturedCallback = cb;
  }
  observe = observeSpy;
  disconnect = disconnectSpy;
  unobserve = vi.fn();
}

beforeEach(() => {
  capturedCallback = null;
  observeSpy.mockClear();
  disconnectSpy.mockClear();
  vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
});

afterEach(() => {
  vi.unstubAllGlobals();
  // Clean up any lingering DOM elements
  document.body.innerHTML = '';
});

function addElement(id: string, tag = 'div'): HTMLElement {
  const el = document.createElement(tag);
  el.id = id;
  document.body.appendChild(el);
  return el;
}

function makeEntry(element: Element, isIntersecting: boolean): IntersectionObserverEntry {
  return {
    target: element,
    isIntersecting,
    boundingClientRect: {} as DOMRectReadOnly,
    intersectionRatio: isIntersecting ? 1 : 0,
    intersectionRect: {} as DOMRectReadOnly,
    rootBounds: null,
    time: 0,
  } as unknown as IntersectionObserverEntry;
}

describe('useActiveSection', () => {
  it('initialises with the first section id', () => {
    const { result } = renderHook(() =>
      useActiveSection(['intro', 'features', 'pricing']),
    );
    expect(result.current).toBe('intro');
  });

  it('returns empty string when passed an empty array', () => {
    const { result } = renderHook(() => useActiveSection([]));
    expect(result.current).toBe('');
  });

  it('observes all section elements that exist in the DOM', () => {
    addElement('sec-a');
    addElement('sec-b');

    renderHook(() => useActiveSection(['sec-a', 'sec-b']));

    expect(observeSpy).toHaveBeenCalledTimes(2);
  });

  it('does not call observe for ids not found in the DOM', () => {
    renderHook(() => useActiveSection(['non-existent-id']));
    expect(observeSpy).not.toHaveBeenCalled();
  });

  it('updates activeId when an intersecting entry fires', () => {
    const el = addElement('hero-section');

    const { result } = renderHook(() =>
      useActiveSection(['intro', 'hero-section']),
    );

    act(() => {
      capturedCallback?.([makeEntry(el, true)]);
    });

    expect(result.current).toBe('hero-section');
  });

  it('ignores non-intersecting entries', () => {
    const el = addElement('about-section');

    const { result } = renderHook(() =>
      useActiveSection(['intro-section', 'about-section']),
    );

    act(() => {
      capturedCallback?.([makeEntry(el, false)]);
    });

    // Should remain on the initial value (intro-section)
    expect(result.current).toBe('intro-section');
  });

  it('disconnects observer on unmount', () => {
    const { unmount } = renderHook(() => useActiveSection(['sec-x']));
    unmount();
    expect(disconnectSpy).toHaveBeenCalled();
  });

  it('reconnects observer when sectionIds reference changes', () => {
    const ids1 = ['one', 'two'];
    const ids2 = ['three', 'four'];

    const { rerender } = renderHook(({ ids }) => useActiveSection(ids), {
      initialProps: { ids: ids1 },
    });

    const disconnectCountBefore = disconnectSpy.mock.calls.length;

    rerender({ ids: ids2 });

    expect(disconnectSpy.mock.calls.length).toBeGreaterThan(disconnectCountBefore);
  });

  it('uses the rootMargin option -20% 0px -70% 0px', () => {
    const constructorSpy = vi.fn(function (
      this: MockIntersectionObserver,
      cb: IntersectionCallback,
      options?: IntersectionObserverInit,
    ) {
      capturedCallback = cb;
      void options;
      this.observe = observeSpy;
      this.disconnect = disconnectSpy;
      this.unobserve = vi.fn();
    });

    vi.stubGlobal('IntersectionObserver', constructorSpy);

    renderHook(() => useActiveSection(['test-section']));

    expect(constructorSpy).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({ rootMargin: '-20% 0px -70% 0px' }),
    );
  });
});
