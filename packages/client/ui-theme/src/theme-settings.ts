/** Theme preferences stored in the Host user-settings document. */

import z from '@deepseek-ai/schemastery'

/** Built-in New Year's Day theme preference and registered theme id. */
export const NEW_YEAR_THEME_ID = 'new-year'

/** Built-in DeepSeek birthday theme preference and registered theme id. */
export const BIRTHDAY_THEME_ID = 'birthday'

/** Built-in Spring Festival theme preference and registered theme id. */
export const SPRING_FESTIVAL_THEME_ID = 'spring-festival'

/** Built-in Mid-Autumn theme preference and registered theme id. */
export const MID_AUTUMN_THEME_ID = 'mid-autumn'

/** Built-in National Day theme preference and registered theme id. */
export const NATIONAL_DAY_THEME_ID = 'national-day'

/** Product seasonal themes that can be selected or calendar-resolved. */
export const SEASONAL_THEME_IDS = [
  NEW_YEAR_THEME_ID,
  BIRTHDAY_THEME_ID,
  SPRING_FESTIVAL_THEME_ID,
  MID_AUTUMN_THEME_ID,
  NATIONAL_DAY_THEME_ID,
] as const

/** Seasonal theme preference subset. */
export type SeasonalThemePreference = typeof SEASONAL_THEME_IDS[number]

/** Built-in preferences accepted at the registry and settings boundaries. */
export const THEME_PREFERENCES = ['light', 'dark', 'system', ...SEASONAL_THEME_IDS] as const

/** Settings namespace owned by the theme plugin. */
export const THEME_SETTINGS_NAMESPACE = 'ui-theme'

/** Field carrying the selected built-in theme preference. */
export const THEME_PREFERENCE_FIELD = 'preference'

/** Theme preference persisted by the product Appearance row. */
export type ThemePreference = typeof THEME_PREFERENCES[number]

/** Default preference when the user-settings document has no override. */
export const DEFAULT_PREFERENCE: ThemePreference = 'system'

/** Durable theme section shared by the Host schema and the browser scope. */
export interface ThemeSettings {
  /** Selected built-in preference. */
  preference: ThemePreference
}

/** Durable theme schema; also the wire envelope the browser scope validates against. */
export const ThemeSettingsSchema: z<ThemeSettings> = z.object({
  [THEME_PREFERENCE_FIELD]: z.union([...THEME_PREFERENCES]).default(DEFAULT_PREFERENCE),
})

/**
 * Narrow one wire or registry value to a persistable preference.
 * @param value - value read from settings or passed to the registry API.
 * @returns whether the value is a built-in preference.
 */
export function isThemePreference(value: unknown): value is ThemePreference {
  return THEME_PREFERENCES.some(preference => preference === value)
}
