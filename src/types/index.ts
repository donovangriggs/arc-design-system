export type Framework = 'react' | 'vue' | 'angular' | 'svelte';

export interface PropDefinition {
  readonly name: string;
  readonly type: string;
  readonly default: string;
  readonly description: string;
}

export interface ComponentMeta {
  readonly id: string;
  readonly name: string;
  readonly tagName: string;
  readonly description: string;
  readonly category: 'action' | 'layout' | 'form' | 'feedback' | 'data-display' | 'utility';
  readonly props: ReadonlyArray<PropDefinition>;
}

export type FrameworkSnippets = Readonly<Record<Framework, string>>;

export const FRAMEWORK_LABELS: Readonly<Record<Framework, string>> = {
  react: 'React',
  vue: 'Vue',
  angular: 'Angular',
  svelte: 'Svelte',
};

export const FRAMEWORK_COLORS: Readonly<Record<Framework, string>> = {
  react: '#61dafb',
  vue: '#42b883',
  angular: '#dd0031',
  svelte: '#ff3e00',
};

export const FRAMEWORK_LANGS: Readonly<Record<Framework, string>> = {
  react: 'tsx',
  vue: 'vue',
  angular: 'typescript',
  svelte: 'svelte',
};
