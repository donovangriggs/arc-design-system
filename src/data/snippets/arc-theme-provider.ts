import type { FrameworkSnippets } from '@/types';

export const snippets: FrameworkSnippets = {
  react: `import { useState } from 'react';
import { ArcButton } from '@arctech/react';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <arc-theme-provider theme={theme}>
      <ArcButton
        variant="outline"
        onArcClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      >
        Toggle {theme === 'light' ? 'Dark' : 'Light'} Mode
      </ArcButton>
    </arc-theme-provider>
  );
}`,

  vue: `<template>
  <arc-theme-provider :theme="theme">
    <ArcButton variant="outline" @arc-click="toggleTheme">
      Toggle {{ theme === 'light' ? 'Dark' : 'Light' }} Mode
    </ArcButton>
  </arc-theme-provider>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ArcButton } from '@arctech/vue';

const theme = ref<'light' | 'dark'>('light');
const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
};
</script>`,

  angular: `import { Component } from '@angular/core';
import { ArcComponentsModule } from '@arctech/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-theme-demo',
  standalone: true,
  imports: [ArcComponentsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <arc-theme-provider [attr.theme]="theme">
      <arc-button variant="outline" (arcClick)="toggleTheme()">
        Toggle {{ theme === 'light' ? 'Dark' : 'Light' }} Mode
      </arc-button>
    </arc-theme-provider>
  \`,
})
export class ThemeDemoComponent {
  theme: 'light' | 'dark' = 'light';

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
  }
}`,

  svelte: `<script lang="ts">
  import { ArcButton } from '@arctech/svelte';

  let theme: 'light' | 'dark' = 'light';

  function toggleTheme() {
    theme = theme === 'light' ? 'dark' : 'light';
  }
</script>

<arc-theme-provider {theme}>
  <ArcButton variant="outline" on:arcClick={toggleTheme}>
    Toggle {theme === 'light' ? 'Dark' : 'Light'} Mode
  </ArcButton>
</arc-theme-provider>`,
};
