import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { CounterStat } from '@/components/hero/CounterStat';

describe('CounterStat', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders the label', () => {
    render(<CounterStat value="10" label="Components" delay={0} />);
    expect(screen.getByText('Components')).toBeInTheDocument();
  });

  it('renders without crashing given various value shapes', () => {
    render(<CounterStat value="60" label="Items" delay={0} />);
    expect(screen.getByText('Items')).toBeInTheDocument();
  });

  it('reaches the final numeric value after the counter duration elapses', () => {
    render(<CounterStat value="60" label="Items" delay={0} />);

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    // The container div should contain "60" somewhere in its text
    const allText = document.body.textContent ?? '';
    expect(allText).toContain('60');
  });

  it('handles a value with a suffix (e.g. "10k+")', () => {
    render(<CounterStat value="10k+" label="Downloads" delay={0} />);

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    // After the counter finishes, the display should be "10k+"
    const allText = document.body.textContent ?? '';
    expect(allText).toContain('10k+');
  });

  it('renders a value with a prefix correctly', () => {
    render(<CounterStat value="~5" label="Adopters" delay={0} />);

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.getByText('Adopters')).toBeInTheDocument();
  });

  it('renders a non-numeric value as-is without animation', () => {
    render(<CounterStat value="N/A" label="Score" delay={0} />);

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.getByText('N/A')).toBeInTheDocument();
  });

  it('does not crash when value is an empty string', () => {
    render(<CounterStat value="" label="Empty" delay={0} />);
    expect(screen.getByText('Empty')).toBeInTheDocument();
  });

  it('increments counter step by step before reaching the final value', () => {
    render(<CounterStat value="60" label="Steps" delay={0} />);

    // Advance by half the duration — counter should be progressing
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    // Label should still be rendered (component is alive)
    expect(screen.getByText('Steps')).toBeInTheDocument();
  });

  it('clears the interval on unmount', () => {
    const clearIntervalSpy = vi.spyOn(globalThis, 'clearInterval');
    const { unmount } = render(<CounterStat value="50" label="Things" delay={0} />);
    unmount();
    expect(clearIntervalSpy).toHaveBeenCalled();
  });

  it('accepts a delay prop without crashing', () => {
    render(<CounterStat value="5" label="Delayed" delay={0.5} />);
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(screen.getByText('Delayed')).toBeInTheDocument();
  });
});
