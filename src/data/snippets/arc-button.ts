import type { FrameworkSnippets } from '@/types';

export const snippets: FrameworkSnippets = {
  react: `import { ArcButton } from '@arctech/react';

function App() {
  const handleClick = () => console.log('Clicked!');

  return (
    <div style={{ display: 'flex', gap: '12px' }}>
      <ArcButton variant="primary" onArcClick={handleClick}>
        Primary
      </ArcButton>
      <ArcButton variant="secondary">Secondary</ArcButton>
      <ArcButton variant="outline">Outline</ArcButton>
      <ArcButton variant="ghost">Ghost</ArcButton>
      <ArcButton variant="destructive">Destructive</ArcButton>
      <ArcButton variant="primary" loading>Loading</ArcButton>
    </div>
  );
}`,

  vue: `<template>
  <div style="display: flex; gap: 12px">
    <ArcButton variant="primary" @arc-click="handleClick">
      Primary
    </ArcButton>
    <ArcButton variant="secondary">Secondary</ArcButton>
    <ArcButton variant="outline">Outline</ArcButton>
    <ArcButton variant="ghost">Ghost</ArcButton>
    <ArcButton variant="destructive">Destructive</ArcButton>
    <ArcButton variant="primary" :loading="true">Loading</ArcButton>
  </div>
</template>

<script setup lang="ts">
import { ArcButton } from '@arctech/vue';

const handleClick = () => console.log('Clicked!');
</script>`,

  angular: `import { Component } from '@angular/core';
import { ArcComponentsModule } from '@arctech/angular';

@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [ArcComponentsModule],
  template: \`
    <div style="display: flex; gap: 12px">
      <arc-button variant="primary" (arcClick)="handleClick()">
        Primary
      </arc-button>
      <arc-button variant="secondary">Secondary</arc-button>
      <arc-button variant="outline">Outline</arc-button>
      <arc-button variant="ghost">Ghost</arc-button>
      <arc-button variant="destructive">Destructive</arc-button>
      <arc-button variant="primary" [loading]="true">Loading</arc-button>
    </div>
  \`,
})
export class ButtonsComponent {
  handleClick() {
    console.log('Clicked!');
  }
}`,

  svelte: `<script lang="ts">
  import { ArcButton } from '@arctech/svelte';

  function handleClick() {
    console.log('Clicked!');
  }
</script>

<div style="display: flex; gap: 12px">
  <ArcButton variant="primary" on:arcClick={handleClick}>
    Primary
  </ArcButton>
  <ArcButton variant="secondary">Secondary</ArcButton>
  <ArcButton variant="outline">Outline</ArcButton>
  <ArcButton variant="ghost">Ghost</ArcButton>
  <ArcButton variant="destructive">Destructive</ArcButton>
  <ArcButton variant="primary" loading={true}>Loading</ArcButton>
</div>`,
};
