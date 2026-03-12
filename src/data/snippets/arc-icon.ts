import type { FrameworkSnippets } from '@/types';

export const snippets: FrameworkSnippets = {
  react: `import { ArcIcon } from '@arctech/react';

const icons = ['check', 'plus', 'search', 'heart', 'star', 'user', 'menu', 'info'];

function App() {
  return (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      {icons.map((name) => (
        <ArcIcon key={name} name={name} size={24} color="var(--arc-color-primary-500)" />
      ))}
    </div>
  );
}`,

  vue: `<template>
  <div style="display: flex; gap: 16px; flex-wrap: wrap">
    <ArcIcon
      v-for="name in icons"
      :key="name"
      :name="name"
      :size="24"
      color="var(--arc-color-primary-500)"
    />
  </div>
</template>

<script setup lang="ts">
import { ArcIcon } from '@arctech/vue';

const icons = ['check', 'plus', 'search', 'heart', 'star', 'user', 'menu', 'info'];
</script>`,

  angular: `import { Component } from '@angular/core';
import { ArcComponentsModule } from '@arctech/angular';

@Component({
  selector: 'app-icon-demo',
  standalone: true,
  imports: [ArcComponentsModule],
  template: \`
    <div style="display: flex; gap: 16px; flex-wrap: wrap">
      @for (name of icons; track name) {
        <arc-icon [name]="name" [size]="24" color="var(--arc-color-primary-500)">
        </arc-icon>
      }
    </div>
  \`,
})
export class IconDemoComponent {
  icons = ['check', 'plus', 'search', 'heart', 'star', 'user', 'menu', 'info'];
}`,

  svelte: `<script lang="ts">
  import { ArcIcon } from '@arctech/svelte';

  const icons = ['check', 'plus', 'search', 'heart', 'star', 'user', 'menu', 'info'];
</script>

<div style="display: flex; gap: 16px; flex-wrap: wrap">
  {#each icons as name}
    <ArcIcon {name} size={24} color="var(--arc-color-primary-500)" />
  {/each}
</div>`,
};
