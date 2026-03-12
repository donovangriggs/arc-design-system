import type { PropDefinition } from '@/types';

interface PropsTableProps {
  readonly props: ReadonlyArray<PropDefinition>;
}

export function PropsTable({ props }: PropsTableProps) {
  if (props.length === 0) return null;

  return (
    <div
      style={{
        borderRadius: 12,
        border: '1px solid var(--arc-color-neutral-200)',
        overflow: 'hidden',
      }}
    >
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: 13,
        }}
      >
        <thead>
          <tr
            style={{
              background: 'var(--arc-color-neutral-50)',
              borderBottom: '1px solid var(--arc-color-neutral-200)',
            }}
          >
            <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600, color: 'var(--arc-color-neutral-700)' }}>Name</th>
            <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600, color: 'var(--arc-color-neutral-700)' }}>Type</th>
            <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600, color: 'var(--arc-color-neutral-700)' }}>Default</th>
            <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600, color: 'var(--arc-color-neutral-700)' }}>Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop, i) => (
            <tr
              key={prop.name}
              style={{
                background: i % 2 === 0 ? 'var(--arc-color-neutral-0)' : 'var(--arc-color-neutral-50)',
                borderBottom: '1px solid var(--arc-color-neutral-100)',
              }}
            >
              <td style={{ padding: '8px 12px', fontFamily: 'var(--arc-font-family-mono)', color: 'var(--arc-color-primary-600)', fontWeight: 500 }}>
                {prop.name}
              </td>
              <td style={{ padding: '8px 12px', fontFamily: 'var(--arc-font-family-mono)', color: 'var(--arc-color-neutral-600)', fontSize: 12 }}>
                {prop.type}
              </td>
              <td style={{ padding: '8px 12px', fontFamily: 'var(--arc-font-family-mono)', color: 'var(--arc-color-neutral-500)', fontSize: 12 }}>
                {prop.default}
              </td>
              <td style={{ padding: '8px 12px', color: 'var(--arc-color-neutral-700)' }}>
                {prop.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
