/**
 * Theme bootstrap row for the browser's pre-plugin interval. Each index
 * render embeds the current durable built-in preference; the browser resolves
 * `system`, then writes the same DOM fields and built-in token variables
 * ui-layout's ThemePresenter owns after the client plugin tree activates.
 */

import type { IndexInjection } from '@deepseek-ai/dsh-host-webserver'
import { NATIONAL_DAY_TOKENS } from './builtin-themes.ts'
import { DEFAULT_PREFERENCE, NATIONAL_DAY_THEME_ID, type ThemePreference } from './theme-settings.ts'

/** Build the inline script body for one schema-validated built-in preference. */
function bootThemeScript(preference: ThemePreference): string {
  return `(() => {
  const preference = ${JSON.stringify(preference)}
  const nationalDayTheme = ${JSON.stringify(NATIONAL_DAY_THEME_ID)}
  const nationalDayTokens = ${JSON.stringify(NATIONAL_DAY_TOKENS)}
  const date = new Date()
  const calendarTheme = date.getMonth() === 9 && date.getDate() >= 1 && date.getDate() <= 7
    ? nationalDayTheme
    : undefined
  const resolved = preference === 'system' ? calendarTheme ?? preference : preference
  const systemDark = resolved === 'system'
    && typeof matchMedia !== 'undefined'
    && matchMedia('(prefers-color-scheme: dark)').matches
  const dark = resolved === 'dark' || systemDark
  document.documentElement.style.colorScheme = dark ? 'dark' : 'light'
  document.body.toggleAttribute('data-ds-dark-theme', dark)
  if (resolved === nationalDayTheme) {
    for (const [name, value] of Object.entries(nationalDayTokens)) {
      document.body.style.setProperty(name, value)
    }
  }
})()`
}

/**
 * The theme bootstrap as an injection row: an inline script immediately after
 * the opening body tag, before the shell mount and module script.
 * @param preference - Current Host-backed built-in preference.
 * @returns the body script row.
 */
export function bootThemeInjection(
  preference: ThemePreference = DEFAULT_PREFERENCE,
): IndexInjection {
  return { kind: 'script', placement: 'body', text: bootThemeScript(preference) }
}
