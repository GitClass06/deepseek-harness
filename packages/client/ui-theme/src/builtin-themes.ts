/** Built-in theme token tables and calendar-triggered theme resolution. */

import { NATIONAL_DAY_THEME_ID } from './theme-settings.ts'

/** Token dictionary shared by ThemeRuntime and the pre-plugin bootstrap. */
export type BuiltinThemeTokens = Readonly<Record<string, string>>

const NATIONAL_DAY_PAGE_FILL = [
  'radial-gradient(circle at 86% 14%, rgba(255, 215, 0, 0.16) 0 48px, transparent 96px)',
  'radial-gradient(circle at 10% 8%, rgba(222, 41, 16, 0.1) 0 56px, transparent 140px)',
  'linear-gradient(135deg, rgb(255, 245, 245) 0%, rgb(255, 232, 232) 50%, rgb(255, 240, 230) 100%)',
].join(', ')

/** National Day's built-in palette, based on the Calicat reference layer. */
export const NATIONAL_DAY_TOKENS = Object.freeze({
  '--dsw-alias-bg-base': 'rgb(255, 245, 245)',
  '--dsw-alias-bg-layer-1': 'rgb(255, 255, 255)',
  '--dsw-alias-bg-layer-2': 'rgb(255, 250, 242)',
  '--dsw-alias-bg-layer-3': 'rgb(255, 246, 230)',
  '--dsw-alias-bg-module-platform': 'rgb(255, 240, 220)',
  '--dsw-alias-bg-multi-select': 'rgb(255, 240, 220)',
  '--dsw-alias-bg-overlay': 'rgb(255, 250, 242)',
  '--dsw-alias-border-l1': 'rgba(222, 41, 16, 0.12)',
  '--dsw-alias-border-l2': 'rgba(222, 41, 16, 0.18)',
  '--dsw-alias-border-l2-darkmode-thin': 'rgba(255, 215, 0, 0.32)',
  '--dsw-alias-border-l3': 'rgba(222, 41, 16, 0.24)',
  '--dsw-alias-brand-primary': 'rgb(222, 41, 16)',
  '--dsw-alias-brand-primary-invert': 'rgb(255, 215, 0)',
  '--dsw-alias-brand-primary-new-colorprimary-new-color': 'rgb(222, 41, 16)',
  '--dsw-alias-brand-text': 'rgb(139, 0, 0)',
  '--dsw-alias-button-elevated-fill': 'rgb(255, 255, 255)',
  '--dsw-alias-button-floating-fill': 'rgb(255, 255, 255)',
  '--dsw-alias-button-floating-hover': 'rgb(255, 246, 230)',
  '--dsw-alias-button-info-fill': 'rgb(222, 41, 16)',
  '--dsw-alias-button-info-hover': 'rgb(139, 0, 0)',
  '--dsw-alias-button-primary-dimmed': 'rgba(222, 41, 16, 0.18)',
  '--dsw-alias-button-primary-fill': 'rgb(222, 41, 16)',
  '--dsw-alias-button-primary-hover': 'rgb(139, 0, 0)',
  '--dsw-alias-interactive-bg-active': 'rgba(222, 41, 16, 0.14)',
  '--dsw-alias-interactive-bg-hover-accent': 'rgba(255, 215, 0, 0.22)',
  '--dsw-alias-interactive-bg-hover-solid': 'rgb(255, 232, 232)',
  '--dsw-alias-interactive-bg-hover': 'rgba(222, 41, 16, 0.08)',
  '--dsw-alias-label-caption': 'rgba(126, 52, 31, 0.72)',
  '--dsw-alias-label-dimmed': 'rgba(126, 52, 31, 0.48)',
  '--dsw-alias-label-primary-bluish': 'rgb(222, 41, 16)',
  '--dsw-alias-label-primary-dimmed': 'rgb(139, 0, 0)',
  '--dsw-alias-label-primary-foreground': 'rgb(255, 255, 255)',
  '--dsw-alias-label-primary-inverted': 'rgb(255, 255, 255)',
  '--dsw-alias-label-primary': 'rgb(92, 0, 0)',
  '--dsw-alias-label-secondary': 'rgb(126, 52, 31)',
  '--dsw-alias-label-tertiary': 'rgb(160, 82, 45)',
  '--dsw-alias-scrollbar-bg-l1': 'rgba(222, 41, 16, 0.22)',
  '--dsw-alias-scrollbar-bg-l2': 'rgba(222, 41, 16, 0.28)',
  '--dsw-alias-scrollbar-hover-l1': 'rgba(222, 41, 16, 0.36)',
  '--dsw-alias-scrollbar-hover-l2': 'rgba(222, 41, 16, 0.42)',
  '--dsw-alias-state-business-primary': 'rgb(222, 41, 16)',
  '--dsw-alias-state-business-tertiary': 'rgba(222, 41, 16, 0.1)',
  '--dsw-alias-state-warn-label': 'rgb(160, 82, 45)',
  '--dsw-alias-state-warn-primary': 'rgb(255, 190, 0)',
  '--dsw-alias-state-warn-secondary': 'rgb(255, 215, 0)',
  '--dsw-alias-state-warn-tertiary': 'rgba(255, 215, 0, 0.24)',
  '--dsw-specific-app-frame-fill': NATIONAL_DAY_PAGE_FILL,
  '--dsw-specific-bubble-highlight': 'rgb(255, 224, 204)',
  '--dsw-specific-bubble': 'rgb(255, 242, 225)',
  '--dsw-specific-conversation-fill': NATIONAL_DAY_PAGE_FILL,
  '--dsw-specific-input-major': 'rgb(255, 255, 255)',
  '--dsw-specific-menu': 'rgb(255, 250, 242)',
  '--dsw-specific-selector': 'rgb(255, 240, 220)',
  '--dsw-specific-sidebar-fill': 'rgb(139, 0, 0)',
  '--dsw-specific-sidebar-label-caption': 'rgba(255, 250, 230, 0.52)',
  '--dsw-specific-sidebar-label-dimmed': 'rgba(255, 250, 230, 0.36)',
  '--dsw-specific-sidebar-label-primary-bluish': 'rgb(255, 215, 0)',
  '--dsw-specific-sidebar-label-primary-dimmed': 'rgba(255, 250, 230, 0.72)',
  '--dsw-specific-sidebar-label-primary': 'rgb(255, 250, 230)',
  '--dsw-specific-sidebar-label-secondary': 'rgba(255, 250, 230, 0.82)',
  '--dsw-specific-sidebar-label-tertiary': 'rgba(255, 250, 230, 0.62)',
  '--dsw-specific-sidebar-new-session-border': 'rgba(255, 215, 0, 0.72)',
  '--dsw-specific-sidebar-new-session-fill': 'rgb(255, 255, 255)',
  '--dsw-specific-sidebar-new-session-hover': 'rgb(255, 246, 230)',
  '--dsw-specific-sidebar-new-session-label': 'rgb(139, 0, 0)',
  '--dsw-specific-sidebar-new-session-shadow': '0 10px 22px rgba(139, 0, 0, 0.18)',
  '--dsw-specific-sidebar-nav-item-active-accent': 'rgb(255, 215, 0)',
  '--dsw-specific-sidebar-nav-item-active': 'rgba(255, 215, 0, 0.18)',
  '--dsw-specific-sidebar-nav-item-hover': 'rgba(255, 255, 255, 0.1)',
  '--dsw-specific-national-day-decoration-display': 'block',
  '--dsw-specific-settings-panel-label-caption': 'rgba(126, 52, 31, 0.72)',
  '--dsw-specific-settings-panel-label-dimmed': 'rgba(126, 52, 31, 0.48)',
  '--dsw-specific-settings-panel-label-primary-bluish': 'rgb(222, 41, 16)',
  '--dsw-specific-settings-panel-label-primary-dimmed': 'rgb(139, 0, 0)',
  '--dsw-specific-settings-panel-label-primary': 'rgb(92, 0, 0)',
  '--dsw-specific-settings-panel-label-secondary': 'rgb(126, 52, 31)',
  '--dsw-specific-settings-panel-label-tertiary': 'rgb(160, 82, 45)',
  '--dsw-specific-settings-panel-nav-item-active': 'rgba(255, 215, 0, 0.24)',
  '--dsw-specific-settings-panel-nav-item-hover': 'rgba(222, 41, 16, 0.08)',
  '--dsw-specific-tip': 'rgb(255, 240, 220)',
}) satisfies BuiltinThemeTokens

/**
 * Resolve the calendar-owned product theme for the browser's local day.
 * @param ms - sample time in Unix milliseconds.
 * @returns the National Day theme id during October 1-7; otherwise undefined.
 */
export function calendarThemePreferenceAt(ms: number = Date.now()): typeof NATIONAL_DAY_THEME_ID | undefined {
  const date = new Date(ms)
  const month = date.getMonth()
  const day = date.getDate()
  return month === 9 && day >= 1 && day <= 7 ? NATIONAL_DAY_THEME_ID : undefined
}

/**
 * Calculate when the next local-date sample should run.
 * @param ms - sample time in Unix milliseconds.
 * @returns delay until the next local date boundary.
 */
export function msUntilNextLocalDate(ms: number = Date.now()): number {
  const next = new Date(ms)
  next.setHours(24, 0, 0, 0)
  return Math.max(1, next.getTime() - ms)
}
