import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PropsTable } from '@/components/showcase/PropsTable';
import type { PropDefinition } from '@/types';

const sampleProps: PropDefinition[] = [
  { name: 'variant', type: "'primary' | 'secondary'", default: "'primary'", description: 'Visual variant' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Button size' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabled state' },
];

describe('PropsTable', () => {
  it('returns null when props array is empty', () => {
    const { container } = render(<PropsTable props={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders a table when props are provided', () => {
    render(<PropsTable props={sampleProps} />);
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('renders a row for each prop', () => {
    render(<PropsTable props={sampleProps} />);
    // tbody rows (excluding thead row)
    const rows = screen.getAllByRole('row');
    // 1 header row + 3 data rows
    expect(rows).toHaveLength(4);
  });

  it('renders the Name column header', () => {
    render(<PropsTable props={sampleProps} />);
    expect(screen.getByRole('columnheader', { name: /name/i })).toBeInTheDocument();
  });

  it('renders the Type column header', () => {
    render(<PropsTable props={sampleProps} />);
    expect(screen.getByRole('columnheader', { name: /type/i })).toBeInTheDocument();
  });

  it('renders the Default column header', () => {
    render(<PropsTable props={sampleProps} />);
    expect(screen.getByRole('columnheader', { name: /default/i })).toBeInTheDocument();
  });

  it('renders the Description column header', () => {
    render(<PropsTable props={sampleProps} />);
    expect(screen.getByRole('columnheader', { name: /description/i })).toBeInTheDocument();
  });

  it('displays prop names in the table', () => {
    render(<PropsTable props={sampleProps} />);
    expect(screen.getByText('variant')).toBeInTheDocument();
    expect(screen.getByText('size')).toBeInTheDocument();
    expect(screen.getByText('disabled')).toBeInTheDocument();
  });

  it('displays prop types in the table', () => {
    render(<PropsTable props={sampleProps} />);
    expect(screen.getByText("'primary' | 'secondary'")).toBeInTheDocument();
  });

  it('displays prop default values', () => {
    render(<PropsTable props={sampleProps} />);
    expect(screen.getByText("'primary'")).toBeInTheDocument();
    expect(screen.getByText('false')).toBeInTheDocument();
  });

  it('displays prop descriptions', () => {
    render(<PropsTable props={sampleProps} />);
    expect(screen.getByText('Visual variant')).toBeInTheDocument();
    expect(screen.getByText('Disabled state')).toBeInTheDocument();
  });

  it('renders a single prop correctly', () => {
    const single: PropDefinition[] = [
      { name: 'open', type: 'boolean', default: 'false', description: 'Open state' },
    ];
    render(<PropsTable props={single} />);
    expect(screen.getByText('open')).toBeInTheDocument();
    expect(screen.getByText('Open state')).toBeInTheDocument();
  });
});
