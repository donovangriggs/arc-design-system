import type { FrameworkSnippets } from '@/types';
import { snippets as arcButton } from './arc-button';
import { snippets as arcCard } from './arc-card';
import { snippets as arcInput } from './arc-input';
import { snippets as arcBadge } from './arc-badge';
import { snippets as arcAvatar } from './arc-avatar';
import { snippets as arcModal } from './arc-modal';
import { snippets as arcAlert } from './arc-alert';
import { snippets as arcTooltip } from './arc-tooltip';
import { snippets as arcIcon } from './arc-icon';
import { snippets as arcThemeProvider } from './arc-theme-provider';

export const SNIPPETS: Readonly<Record<string, FrameworkSnippets>> = {
  'arc-button': arcButton,
  'arc-card': arcCard,
  'arc-input': arcInput,
  'arc-badge': arcBadge,
  'arc-avatar': arcAvatar,
  'arc-modal': arcModal,
  'arc-alert': arcAlert,
  'arc-tooltip': arcTooltip,
  'arc-icon': arcIcon,
  'arc-theme-provider': arcThemeProvider,
};
