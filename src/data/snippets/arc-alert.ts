import type { FrameworkSnippets } from '@/types';

export const snippets: FrameworkSnippets = {
  react: `import { ArcAlert } from '@arctech/react';

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <ArcAlert variant="info" alertTitle="Info">
        This is an informational message.
      </ArcAlert>
      <ArcAlert variant="success" alertTitle="Success" dismissible>
        Operation completed successfully.
      </ArcAlert>
      <ArcAlert variant="warning" alertTitle="Warning">
        Please review before continuing.
      </ArcAlert>
      <ArcAlert variant="error" alertTitle="Error" dismissible>
        Something went wrong.
      </ArcAlert>
    </div>
  );
}`,

  vue: `<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <ArcAlert variant="info" alertTitle="Info">
      This is an informational message.
    </ArcAlert>
    <ArcAlert variant="success" alertTitle="Success" :dismissible="true">
      Operation completed successfully.
    </ArcAlert>
    <ArcAlert variant="warning" alertTitle="Warning">
      Please review before continuing.
    </ArcAlert>
    <ArcAlert variant="error" alertTitle="Error" :dismissible="true">
      Something went wrong.
    </ArcAlert>
  </div>
</template>

<script setup lang="ts">
import { ArcAlert } from '@arctech/vue';
</script>`,

  angular: `import { Component } from '@angular/core';
import { ArcComponentsModule } from '@arctech/angular';

@Component({
  selector: 'app-alert-demo',
  standalone: true,
  imports: [ArcComponentsModule],
  template: \`
    <div style="display: flex; flex-direction: column; gap: 12px">
      <arc-alert variant="info" alertTitle="Info">
        This is an informational message.
      </arc-alert>
      <arc-alert variant="success" alertTitle="Success" [dismissible]="true">
        Operation completed successfully.
      </arc-alert>
      <arc-alert variant="warning" alertTitle="Warning">
        Please review before continuing.
      </arc-alert>
      <arc-alert variant="error" alertTitle="Error" [dismissible]="true">
        Something went wrong.
      </arc-alert>
    </div>
  \`,
})
export class AlertDemoComponent {}`,

  svelte: `<script lang="ts">
  import { ArcAlert } from '@arctech/svelte';
</script>

<div style="display: flex; flex-direction: column; gap: 12px">
  <ArcAlert variant="info" alertTitle="Info">
    This is an informational message.
  </ArcAlert>
  <ArcAlert variant="success" alertTitle="Success" dismissible={true}>
    Operation completed successfully.
  </ArcAlert>
  <ArcAlert variant="warning" alertTitle="Warning">
    Please review before continuing.
  </ArcAlert>
  <ArcAlert variant="error" alertTitle="Error" dismissible={true}>
    Something went wrong.
  </ArcAlert>
</div>`,
};
