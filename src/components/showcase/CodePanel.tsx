import { useEffect, useState, useRef } from 'react';
import { codeToHtml } from 'shiki';
import DOMPurify from 'dompurify';
import { Check, Clipboard } from 'lucide-react';
import { useFramework } from '@/hooks/useFramework';
import { FRAMEWORK_LANGS, type FrameworkSnippets } from '@/types';

interface CodePanelProps {
  readonly snippets: FrameworkSnippets;
}

export function CodePanel({ snippets }: CodePanelProps) {
  const { framework } = useFramework();
  const [html, setHtml] = useState('');
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const code = snippets[framework];
  const lang = FRAMEWORK_LANGS[framework];

  useEffect(() => {
    let cancelled = false;
    codeToHtml(code, {
      lang,
      theme: 'one-dark-pro',
    }).then((result) => {
      if (!cancelled) setHtml(DOMPurify.sanitize(result, { FORCE_BODY: true }));
    }).catch(() => {
      if (!cancelled) {
        const escaped = code
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;');
        setHtml(`<pre style="padding:16px;margin:0"><code>${escaped}</code></pre>`);
      }
    });
    return () => { cancelled = true; };
  }, [code, lang]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopyFailed(true);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopyFailed(false), 2000);
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        borderRadius: 12,
        overflow: 'hidden',
        border: '1px solid var(--arc-color-neutral-200)',
        background: '#282c34',
      }}
    >
      {/* Language badge + copy */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 12px',
          borderBottom: '1px solid #3e4451',
          fontSize: 12,
          color: '#abb2bf',
        }}
      >
        <span style={{ textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}>
          {lang}
        </span>
        <button
          type="button"
          aria-label={copied ? 'Copied to clipboard' : copyFailed ? 'Copy failed' : `Copy ${lang} snippet`}
          onClick={handleCopy}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            padding: '4px 8px',
            borderRadius: 6,
            border: 'none',
            background: copied ? 'rgba(74,222,128,0.15)' : copyFailed ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.05)',
            color: copied ? '#4ade80' : copyFailed ? '#ef4444' : '#abb2bf',
            cursor: 'pointer',
            fontSize: 12,
            transition: 'all 150ms',
          }}
        >
          {copied ? <Check size={14} aria-hidden="true" /> : <Clipboard size={14} aria-hidden="true" />}
          {copied ? 'Copied!' : copyFailed ? 'Failed' : 'Copy'}
        </button>
      </div>

      {/* Code */}
      <div
        style={{
          maxHeight: 400,
          overflowY: 'auto',
          fontSize: 13,
          lineHeight: 1.6,
        }}
      >
        {html ? (
          /* html is produced by shiki from static developer-authored snippets — not user input */
          <div dangerouslySetInnerHTML={{ __html: html }} />
        ) : (
          <div style={{ padding: 16, color: '#636870' }}>Loading...</div>
        )}
      </div>
    </div>
  );
}
