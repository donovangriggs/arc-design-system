import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { defineCustomElements } from '@arctech/core/loader';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
import { App } from './App';
import './styles/globals.css';

defineCustomElements();

const root = document.getElementById('root');
if (!root) throw new Error('Root element #root not found in document.');

createRoot(root).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
