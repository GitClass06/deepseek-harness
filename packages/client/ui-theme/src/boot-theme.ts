/**
 * Theme bootstrap row for the browser's pre-plugin interval. Each index
 * render embeds the current durable built-in preference; the browser resolves
 * `system`, then writes the same DOM fields and built-in token variables
 * ui-layout's ThemePresenter owns after the client plugin tree activates.
 */

import type { IndexInjection } from '@deepseek-ai/dsh-host-webserver'
import { SEASONAL_THEME_TOKENS } from './builtin-themes.ts'
import {
  BIRTHDAY_THEME_ID,
  DEFAULT_PREFERENCE,
  MID_AUTUMN_THEME_ID,
  NATIONAL_DAY_THEME_ID,
  NEW_YEAR_THEME_ID,
  SPRING_FESTIVAL_THEME_ID,
  type ThemePreference,
} from './theme-settings.ts'

/** Build the inline script body for one schema-validated built-in preference. */
function bootThemeScript(preference: ThemePreference): string {
  return `(() => {
  const preference = ${JSON.stringify(preference)}
  const newYearTheme = ${JSON.stringify(NEW_YEAR_THEME_ID)}
  const birthdayTheme = ${JSON.stringify(BIRTHDAY_THEME_ID)}
  const springFestivalTheme = ${JSON.stringify(SPRING_FESTIVAL_THEME_ID)}
  const midAutumnTheme = ${JSON.stringify(MID_AUTUMN_THEME_ID)}
  const nationalDayTheme = ${JSON.stringify(NATIONAL_DAY_THEME_ID)}
  const seasonalThemeTokens = ${JSON.stringify(SEASONAL_THEME_TOKENS)}
  const date = new Date()
  const chineseCalendarDay = () => {
    try {
      const parts = new Intl.DateTimeFormat('en-US-u-ca-chinese', { month: 'numeric', day: 'numeric' })
        .formatToParts(date)
      const month = Number.parseInt(parts.find(part => part.type === 'month')?.value ?? '', 10)
      const day = Number.parseInt(parts.find(part => part.type === 'day')?.value ?? '', 10)
      return Number.isFinite(month) && Number.isFinite(day) ? { month, day } : undefined
    } catch {
      return undefined
    }
  }
  const calendarTheme = () => {
    const month = date.getMonth()
    const day = date.getDate()
    if (month === 0 && day === 1) return newYearTheme
    if (month === 6 && day === 17) return birthdayTheme
    const chinese = chineseCalendarDay()
    if (chinese?.month === 1 && chinese.day === 1) return springFestivalTheme
    if (chinese?.month === 8 && chinese.day === 15) return midAutumnTheme
    return month === 9 && day >= 1 && day <= 7 ? nationalDayTheme : undefined
  }
  const resolved = preference === 'system' ? calendarTheme() ?? preference : preference
  const systemDark = resolved === 'system'
    && typeof matchMedia !== 'undefined'
    && matchMedia('(prefers-color-scheme: dark)').matches
  const dark = resolved === 'dark' || systemDark
  document.documentElement.style.colorScheme = dark ? 'dark' : 'light'
  document.body.toggleAttribute('data-ds-dark-theme', dark)
  const tokens = seasonalThemeTokens[resolved]
  if (tokens !== undefined) {
    for (const [name, value] of Object.entries(tokens)) {
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
