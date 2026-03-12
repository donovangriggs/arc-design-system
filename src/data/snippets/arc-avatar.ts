import type { FrameworkSnippets } from '@/types';

export const snippets: FrameworkSnippets = {
  react: `import { ArcAvatar } from '@arctech/react';

function App() {
  return (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <ArcAvatar size="xs" name="XS" />
      <ArcAvatar size="sm" name="SM" />
      <ArcAvatar size="md" name="John Doe" />
      <ArcAvatar size="lg" src="/avatar.jpg" alt="User" />
      <ArcAvatar size="xl" name="XL" shape="square" />
    </div>
  );
}`,

  vue: `<template>
  <div style="display: flex; gap: 12px; align-items: center">
    <ArcAvatar size="xs" name="XS" />
    <ArcAvatar size="sm" name="SM" />
    <ArcAvatar size="md" name="John Doe" />
    <ArcAvatar size="lg" src="/avatar.jpg" alt="User" />
    <ArcAvatar size="xl" name="XL" shape="square" />
  </div>
</template>

<script setup lang="ts">
import { ArcAvatar } from '@arctech/vue';
</script>`,

  angular: `import { Component } from '@angular/core';
import { ArcComponentsModule } from '@arctech/angular';

@Component({
  selector: 'app-avatar-demo',
  standalone: true,
  imports: [ArcComponentsModule],
  template: \`
    <div style="display: flex; gap: 12px; align-items: center">
      <arc-avatar size="xs" name="XS"></arc-avatar>
      <arc-avatar size="sm" name="SM"></arc-avatar>
      <arc-avatar size="md" name="John Doe"></arc-avatar>
      <arc-avatar size="lg" src="/avatar.jpg" alt="User"></arc-avatar>
      <arc-avatar size="xl" name="XL" shape="square"></arc-avatar>
    </div>
  \`,
})
export class AvatarDemoComponent {}`,

  svelte: `<script lang="ts">
  import { ArcAvatar } from '@arctech/svelte';
</script>

<div style="display: flex; gap: 12px; align-items: center">
  <ArcAvatar size="xs" name="XS" />
  <ArcAvatar size="sm" name="SM" />
  <ArcAvatar size="md" name="John Doe" />
  <ArcAvatar size="lg" src="/avatar.jpg" alt="User" />
  <ArcAvatar size="xl" name="XL" shape="square" />
</div>`,
};
