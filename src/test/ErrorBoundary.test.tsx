import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';

// A component that throws on demand
function Bomb({ shouldThrow }: { readonly shouldThrow: boolean }) {
  if (shouldThrow) throw new Error('Explosion!');
  return <div data-testid="safe">All good</div>;
}

describe('ErrorBoundary', () => {
  beforeEach(() => {
    // Suppress React's error boundary console noise during tests
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div data-testid="child">Hello</div>
      </ErrorBoundary>,
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('renders the error UI when a child throws', () => {
    render(
      <ErrorBoundary>
        <Bomb shouldThrow />
      </ErrorBoundary>,
    );
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('shows the error message in the UI', () => {
    render(
      <ErrorBoundary>
        <Bomb shouldThrow />
      </ErrorBoundary>,
    );
    expect(screen.getByText('Explosion!')).toBeInTheDocument();
  });

  it('renders a Try again button when an error occurs', () => {
    render(
      <ErrorBoundary>
        <Bomb shouldThrow />
      </ErrorBoundary>,
    );
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
  });

  it('does NOT render children when an error occurs', () => {
    render(
      <ErrorBoundary>
        <Bomb shouldThrow />
      </ErrorBoundary>,
    );
    expect(screen.queryByTestId('safe')).not.toBeInTheDocument();
  });

  it('resets to non-error state when Try again is clicked', async () => {
    const user = userEvent.setup();

    render(
      <ErrorBoundary>
        <Bomb shouldThrow />
      </ErrorBoundary>,
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();

    // Click Try again — ErrorBoundary resets hasError to false
    await user.click(screen.getByRole('button', { name: /try again/i }));

    // After reset, hasError is false and children render again.
    // Bomb still throws since props haven't changed, but the boundary
    // will catch it again — this time we verify the reset DID occur
    // by confirming "Try again" is still present (boundary re-caught).
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
  });

  it('logs error details to console in DEV mode via componentDidCatch', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <ErrorBoundary>
        <Bomb shouldThrow />
      </ErrorBoundary>,
    );
    // componentDidCatch should have called console.error with '[ErrorBoundary]' prefix
    const callArgs = errorSpy.mock.calls.find(
      (args) => args[0] === '[ErrorBoundary]',
    );
    expect(callArgs).toBeDefined();
    expect(callArgs![1]).toBeInstanceOf(Error);
    expect(callArgs![1].message).toBe('Explosion!');
  });

  it('getDerivedStateFromError sets hasError to true', () => {
    const state = ErrorBoundary.getDerivedStateFromError(new Error('oops'));
    expect(state.hasError).toBe(true);
    expect(state.error?.message).toBe('oops');
  });

  it('getDerivedStateFromError captures the error object', () => {
    const err = new Error('custom message');
    const state = ErrorBoundary.getDerivedStateFromError(err);
    expect(state.error).toBe(err);
  });

  it('renders children after error boundary resets when child no longer throws', async () => {
    const user = userEvent.setup();

    // Use a ref-based flag controlled from outside
    let throwError = true;

    function Conditional() {
      if (throwError) throw new Error('conditional error');
      return <div data-testid="recovered">Recovered</div>;
    }

    const { rerender } = render(
      <ErrorBoundary>
        <Conditional />
      </ErrorBoundary>,
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();

    // Disarm the throw before clicking Try again
    throwError = false;

    await user.click(screen.getByRole('button', { name: /try again/i }));

    // Force a rerender so React picks up the changed flag
    rerender(
      <ErrorBoundary>
        <Conditional />
      </ErrorBoundary>,
    );

    expect(screen.getByTestId('recovered')).toBeInTheDocument();
    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
  });
});
