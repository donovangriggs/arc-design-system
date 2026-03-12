import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FrameworkProvider } from '@/hooks/useFramework';
import { CodePanel } from '@/components/showcase/CodePanel';
import type { FrameworkSnippets } from '@/types';
import { codeToHtml } from 'shiki';

const mockSnippets: FrameworkSnippets = {
  react: 'const App = () => <div />;',
  vue: '<template><div /></template>',
  angular: '@Component({}) export class C {}',
  svelte: '<script>let x = 1;</script>',
};

function mockClipboard(writeText: () => Promise<void>) {
  Object.defineProperty(navigator, 'clipboard', {
    value: { writeText },
    writable: true,
    configurable: true,
  });
}

function renderPanel(snippets = mockSnippets) {
  return render(
    <FrameworkProvider>
      <CodePanel snippets={snippets} />
    </FrameworkProvider>,
  );
}

describe('CodePanel', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.mocked(codeToHtml).mockResolvedValue('<pre><code>mocked</code></pre>');
  });

  it('renders the language badge for the default framework (tsx)', async () => {
    renderPanel();
    await waitFor(() => {
      expect(screen.getByText('tsx')).toBeInTheDocument();
    });
  });

  it('renders the Copy button', async () => {
    renderPanel();
    expect(await screen.findByRole('button', { name: /copy/i })).toBeInTheDocument();
  });

  it('shows Copy text in the default (not copied) state', async () => {
    renderPanel();
    expect(await screen.findByText('Copy')).toBeInTheDocument();
  });

  it('shows loading text while code highlight is pending', () => {
    // Make codeToHtml never resolve within this render
    vi.mocked(codeToHtml).mockImplementation(() => new Promise(() => {}));
    renderPanel();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders highlighted code after shiki resolves', async () => {
    vi.mocked(codeToHtml).mockResolvedValue('<pre><code>highlighted</code></pre>');
    renderPanel();
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
  });

  it('falls back to plain code when shiki rejects', async () => {
    vi.mocked(codeToHtml).mockRejectedValue(new Error('shiki error'));
    renderPanel();
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
  });

  it('shows Copied! text and Check icon after copy button is clicked', async () => {
    const user = userEvent.setup();
    mockClipboard(vi.fn().mockResolvedValue(undefined));

    renderPanel();
    await user.click(await screen.findByRole('button', { name: /copy/i }));

    expect(await screen.findByText('Copied!')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /copied to clipboard/i })).toBeInTheDocument();
  });

  it('calls clipboard.writeText with the current snippet', async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    mockClipboard(writeText);

    renderPanel();
    await user.click(await screen.findByRole('button', { name: /copy/i }));

    expect(writeText).toHaveBeenCalledWith(mockSnippets.react);
  });

  it('shows Failed text when clipboard write fails', async () => {
    const user = userEvent.setup();
    mockClipboard(vi.fn().mockRejectedValue(new Error('denied')));

    renderPanel();
    await user.click(await screen.findByRole('button', { name: /copy/i }));

    expect(await screen.findByText('Failed')).toBeInTheDocument();
    expect(screen.queryByText('Copied!')).not.toBeInTheDocument();
  });

  it('calls codeToHtml with one-dark-pro theme', async () => {
    renderPanel();
    await waitFor(() => {
      expect(codeToHtml).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ theme: 'one-dark-pro' }),
      );
    });
  });

  it('updates language badge when framework changes via context', async () => {
    localStorage.setItem('arc-design-system-framework', 'vue');
    renderPanel();
    await waitFor(() => {
      expect(screen.getByText('vue')).toBeInTheDocument();
    });
  });

  it('passes the correct lang to codeToHtml based on framework', async () => {
    localStorage.setItem('arc-design-system-framework', 'angular');
    renderPanel();
    await waitFor(() => {
      expect(codeToHtml).toHaveBeenCalledWith(
        mockSnippets.angular,
        expect.objectContaining({ lang: 'typescript' }),
      );
    });
  });
});
