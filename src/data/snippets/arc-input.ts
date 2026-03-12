import type { FrameworkSnippets } from '@/types';

export const snippets: FrameworkSnippets = {
  react: `import { useState } from 'react';
import { ArcInput } from '@arctech/react';

function App() {
  const [value, setValue] = useState('');

  return (
    <ArcInput
      label="Email Address"
      type="email"
      placeholder="you@example.com"
      helperText="We'll never share your email"
      value={value}
      onArcChange={(e) => setValue(e.detail)}
    />
  );
}`,

  vue: `<template>
  <ArcInput
    label="Email Address"
    type="email"
    placeholder="you@example.com"
    helperText="We'll never share your email"
    :value="value"
    @arc-change="value = $event"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ArcInput } from '@arctech/vue';

const value = ref('');
</script>`,

  angular: `import { Component } from '@angular/core';
import { ArcComponentsModule } from '@arctech/angular';

@Component({
  selector: 'app-input-demo',
  standalone: true,
  imports: [ArcComponentsModule],
  template: \`
    <arc-input
      label="Email Address"
      type="email"
      placeholder="you@example.com"
      helperText="We'll never share your email"
      [value]="value"
      (arcChange)="value = $event">
    </arc-input>
  \`,
})
export class InputDemoComponent {
  value = '';
}`,

  svelte: `<script lang="ts">
  import { ArcInput } from '@arctech/svelte';

  let value = '';
</script>

<ArcInput
  label="Email Address"
  type="email"
  placeholder="you@example.com"
  helperText="We'll never share your email"
  {value}
  on:arcChange={(e) => value = e.detail}
/>`,
};
