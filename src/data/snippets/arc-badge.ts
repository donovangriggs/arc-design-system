import type { FrameworkSnippets } from '@/types';

export const snippets: FrameworkSnippets = {
  react: `import { ArcBadge } from '@arctech/react';

function App() {
  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <ArcBadge variant="primary">Primary</ArcBadge>
      <ArcBadge variant="success">Active</ArcBadge>
      <ArcBadge variant="warning">Pending</ArcBadge>
      <ArcBadge variant="error">Failed</ArcBadge>
      <ArcBadge variant="info" dot>Online</ArcBadge>
    </div>
  );
}`,

  vue: `<template>
  <div style="display: flex; gap: 8px; align-items: center">
    <ArcBadge variant="primary">Primary</ArcBadge>
    <ArcBadge variant="success">Active</ArcBadge>
    <ArcBadge variant="warning">Pending</ArcBadge>
    <ArcBadge variant="error">Failed</ArcBadge>
    <ArcBadge variant="info" :dot="true">Online</ArcBadge>
  </div>
</template>

<script setup lang="ts">
import { ArcBadge } from '@arctech/vue';
</script>`,

  angular: `import { Component } from '@angular/core';
import { ArcComponentsModule } from '@arctech/angular';

@Component({
  selector: 'app-badge-demo',
  standalone: true,
  imports: [ArcComponentsModule],
  template: \`
    <div style="display: flex; gap: 8px; align-items: center">
      <arc-badge variant="primary">Primary</arc-badge>
      <arc-badge variant="success">Active</arc-badge>
      <arc-badge variant="warning">Pending</arc-badge>
      <arc-badge variant="error">Failed</arc-badge>
      <arc-badge variant="info" [dot]="true">Online</arc-badge>
    </div>
  \`,
})
export class BadgeDemoComponent {}`,

  svelte: `<script lang="ts">
  import { ArcBadge } from '@arctech/svelte';
</script>

<div style="display: flex; gap: 8px; align-items: center">
  <ArcBadge variant="primary">Primary</ArcBadge>
  <ArcBadge variant="success">Active</ArcBadge>
  <ArcBadge variant="warning">Pending</ArcBadge>
  <ArcBadge variant="error">Failed</ArcBadge>
  <ArcBadge variant="info" dot={true}>Online</ArcBadge>
</div>`,
};
