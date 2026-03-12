import type { FrameworkSnippets } from '@/types';

export const snippets: FrameworkSnippets = {
  react: `import { useState } from 'react';
import { ArcModal, ArcButton } from '@arctech/react';

function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ArcButton onArcClick={() => setOpen(true)}>
        Open Modal
      </ArcButton>
      <ArcModal
        open={open}
        size="md"
        closeOnOverlay
        closeOnEscape
        onArcClose={() => setOpen(false)}
      >
        <h2>Dialog Title</h2>
        <p>Modal content goes here.</p>
        <ArcButton onArcClick={() => setOpen(false)}>Close</ArcButton>
      </ArcModal>
    </>
  );
}`,

  vue: `<template>
  <ArcButton @arc-click="open = true">Open Modal</ArcButton>
  <ArcModal
    :open="open"
    size="md"
    :closeOnOverlay="true"
    :closeOnEscape="true"
    @arc-close="open = false"
  >
    <h2>Dialog Title</h2>
    <p>Modal content goes here.</p>
    <ArcButton @arc-click="open = false">Close</ArcButton>
  </ArcModal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ArcModal, ArcButton } from '@arctech/vue';

const open = ref(false);
</script>`,

  angular: `import { Component } from '@angular/core';
import { ArcComponentsModule } from '@arctech/angular';

@Component({
  selector: 'app-modal-demo',
  standalone: true,
  imports: [ArcComponentsModule],
  template: \`
    <arc-button (arcClick)="open = true">Open Modal</arc-button>
    <arc-modal
      [open]="open"
      size="md"
      [closeOnOverlay]="true"
      [closeOnEscape]="true"
      (arcClose)="open = false">
      <h2>Dialog Title</h2>
      <p>Modal content goes here.</p>
      <arc-button (arcClick)="open = false">Close</arc-button>
    </arc-modal>
  \`,
})
export class ModalDemoComponent {
  open = false;
}`,

  svelte: `<script lang="ts">
  import { ArcModal, ArcButton } from '@arctech/svelte';

  let open = false;
</script>

<ArcButton on:arcClick={() => open = true}>Open Modal</ArcButton>
<ArcModal
  {open}
  size="md"
  closeOnOverlay={true}
  closeOnEscape={true}
  on:arcClose={() => open = false}
>
  <h2>Dialog Title</h2>
  <p>Modal content goes here.</p>
  <ArcButton on:arcClick={() => open = false}>Close</ArcButton>
</ArcModal>`,
};
