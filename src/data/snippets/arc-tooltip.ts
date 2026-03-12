import type { FrameworkSnippets } from '@/types';

export const snippets: FrameworkSnippets = {
  react: `import { ArcTooltip, ArcButton } from '@arctech/react';

function App() {
  return (
    <div style={{ display: 'flex', gap: '12px' }}>
      <ArcTooltip content="Top tooltip" position="top">
        <ArcButton variant="outline">Top</ArcButton>
      </ArcTooltip>
      <ArcTooltip content="Right tooltip" position="right">
        <ArcButton variant="outline">Right</ArcButton>
      </ArcTooltip>
      <ArcTooltip content="Bottom tooltip" position="bottom">
        <ArcButton variant="outline">Bottom</ArcButton>
      </ArcTooltip>
      <ArcTooltip content="Left tooltip" position="left">
        <ArcButton variant="outline">Left</ArcButton>
      </ArcTooltip>
    </div>
  );
}`,

  vue: `<template>
  <div style="display: flex; gap: 12px">
    <ArcTooltip content="Top tooltip" position="top">
      <ArcButton variant="outline">Top</ArcButton>
    </ArcTooltip>
    <ArcTooltip content="Right tooltip" position="right">
      <ArcButton variant="outline">Right</ArcButton>
    </ArcTooltip>
    <ArcTooltip content="Bottom tooltip" position="bottom">
      <ArcButton variant="outline">Bottom</ArcButton>
    </ArcTooltip>
    <ArcTooltip content="Left tooltip" position="left">
      <ArcButton variant="outline">Left</ArcButton>
    </ArcTooltip>
  </div>
</template>

<script setup lang="ts">
import { ArcTooltip, ArcButton } from '@arctech/vue';
</script>`,

  angular: `import { Component } from '@angular/core';
import { ArcComponentsModule } from '@arctech/angular';

@Component({
  selector: 'app-tooltip-demo',
  standalone: true,
  imports: [ArcComponentsModule],
  template: \`
    <div style="display: flex; gap: 12px">
      <arc-tooltip content="Top tooltip" position="top">
        <arc-button variant="outline">Top</arc-button>
      </arc-tooltip>
      <arc-tooltip content="Right tooltip" position="right">
        <arc-button variant="outline">Right</arc-button>
      </arc-tooltip>
      <arc-tooltip content="Bottom tooltip" position="bottom">
        <arc-button variant="outline">Bottom</arc-button>
      </arc-tooltip>
      <arc-tooltip content="Left tooltip" position="left">
        <arc-button variant="outline">Left</arc-button>
      </arc-tooltip>
    </div>
  \`,
})
export class TooltipDemoComponent {}`,

  svelte: `<script lang="ts">
  import { ArcTooltip, ArcButton } from '@arctech/svelte';
</script>

<div style="display: flex; gap: 12px">
  <ArcTooltip content="Top tooltip" position="top">
    <ArcButton variant="outline">Top</ArcButton>
  </ArcTooltip>
  <ArcTooltip content="Right tooltip" position="right">
    <ArcButton variant="outline">Right</ArcButton>
  </ArcTooltip>
  <ArcTooltip content="Bottom tooltip" position="bottom">
    <ArcButton variant="outline">Bottom</ArcButton>
  </ArcTooltip>
  <ArcTooltip content="Left tooltip" position="left">
    <ArcButton variant="outline">Left</ArcButton>
  </ArcTooltip>
</div>`,
};
