import type { FrameworkSnippets } from '@/types';

export const snippets: FrameworkSnippets = {
  react: `import { ArcCard, ArcButton } from '@arctech/react';

function App() {
  return (
    <ArcCard variant="elevated" padding="lg">
      <div slot="header">
        <h3>Card Title</h3>
      </div>
      <p>This is the card body content with supporting text.</p>
      <div slot="footer">
        <ArcButton variant="primary" size="sm">Action</ArcButton>
      </div>
    </ArcCard>
  );
}`,

  vue: `<template>
  <ArcCard variant="elevated" padding="lg">
    <template #header>
      <h3>Card Title</h3>
    </template>
    <p>This is the card body content with supporting text.</p>
    <template #footer>
      <ArcButton variant="primary" size="sm">Action</ArcButton>
    </template>
  </ArcCard>
</template>

<script setup lang="ts">
import { ArcCard, ArcButton } from '@arctech/vue';
</script>`,

  angular: `import { Component } from '@angular/core';
import { ArcComponentsModule } from '@arctech/angular';

@Component({
  selector: 'app-card-demo',
  standalone: true,
  imports: [ArcComponentsModule],
  template: \`
    <arc-card variant="elevated" padding="lg">
      <div slot="header">
        <h3>Card Title</h3>
      </div>
      <p>This is the card body content with supporting text.</p>
      <div slot="footer">
        <arc-button variant="primary" size="sm">Action</arc-button>
      </div>
    </arc-card>
  \`,
})
export class CardDemoComponent {}`,

  svelte: `<script lang="ts">
  import { ArcCard, ArcButton } from '@arctech/svelte';
</script>

<ArcCard variant="elevated" padding="lg">
  <div slot="header">
    <h3>Card Title</h3>
  </div>
  <p>This is the card body content with supporting text.</p>
  <div slot="footer">
    <ArcButton variant="primary" size="sm">Action</ArcButton>
  </div>
</ArcCard>`,
};
