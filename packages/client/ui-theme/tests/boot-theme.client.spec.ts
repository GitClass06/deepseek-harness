// @vitest-environment jsdom
/** The theme bootstrap injection row and the resulting pre-plugin browser theme. */
import { runInNewContext } from 'node:vm'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { SEASONAL_THEME_TOKENS } from '../src/builtin-themes.ts'
import { bootThemeInjection } from '../src/boot-theme.ts'
import {
  BIRTHDAY_THEME_ID,
  MID_AUTUMN_THEME_ID,
  NATIONAL_DAY_THEME_ID,
  NEW_YEAR_THEME_ID,
  SPRING_FESTIVAL_THEME_ID,
  type ThemePreference,
} from '../src/theme-settings.ts'

const DARK_ATTRIBUTE = 'data-ds-dark-theme'

function mockSystemDark(matches: boolean): void {
  vi.stubGlobal('matchMedia', vi.fn(() => ({ matches }) as MediaQueryList))
}

function executeBootstrap(preference?: ThemePreference): void {
  const row = bootThemeInjection(preference)
  if (row.kind !== 'script') throw new Error('theme bootstrap row is not a script')
  runInNewContext(row.text, { Date: globalThis.Date, document, matchMedia: globalThis.matchMedia })
}

beforeEach(() => {
  vi.useFakeTimers()
  vi.setSystemTime(new Date(2026, 7, 29, 12, 0, 0, 0))
})

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
  vi.useRealTimers()
  document.documentElement.style.removeProperty('color-scheme')
  document.body.removeAttribute(DARK_ATTRIBUTE)
  document.body.removeAttribute('style')
})

describe('theme bootstrap row', () => {
  it('is a body script row, so it runs before the shell mount', () => {
    mockSystemDark(false)
    const row = bootThemeInjection('dark')
    expect(row).toMatchObject({ kind: 'script', placement: 'body' })
    executeBootstrap('dark')
    expect(document.documentElement.style.colorScheme).toBe('dark')
    expect(document.body.hasAttribute(DARK_ATTRIBUTE)).toBe(true)
  })

  it('lets durable light override a dark OS and clears stale dark state', () => {
    document.body.setAttribute(DARK_ATTRIBUTE, '')
    mockSystemDark(true)
    executeBootstrap('light')
    expect(document.documentElement.style.colorScheme).toBe('light')
    expect(document.body.hasAttribute(DARK_ATTRIBUTE)).toBe(false)
  })

  it.each([
    [true, 'dark', true],
    [false, 'light', false],
  ] as const)('resolves system=%s to %s', (matches, colorScheme, dark) => {
    mockSystemDark(matches)
    executeBootstrap('system')
    expect(document.documentElement.style.colorScheme).toBe(colorScheme)
    expect(document.body.hasAttribute(DARK_ATTRIBUTE)).toBe(dark)
  })

  it('defaults to system and falls back to light when matchMedia is unavailable', () => {
    vi.stubGlobal('matchMedia', undefined)
    executeBootstrap()
    expect(document.documentElement.style.colorScheme).toBe('light')
    expect(document.body.hasAttribute(DARK_ATTRIBUTE)).toBe(false)
  })

  it.each([
    [NEW_YEAR_THEME_ID, '--dsw-specific-new-year-decoration-display'],
    [BIRTHDAY_THEME_ID, '--dsw-specific-birthday-decoration-display'],
    [SPRING_FESTIVAL_THEME_ID, '--dsw-specific-spring-festival-decoration-display'],
    [MID_AUTUMN_THEME_ID, '--dsw-specific-mid-autumn-decoration-display'],
    [NATIONAL_DAY_THEME_ID, '--dsw-specific-national-day-decoration-display'],
  ] as const)('applies a persisted %s theme before plugins load', (id, displayToken) => {
    mockSystemDark(true)
    executeBootstrap(id)
    const tokens = SEASONAL_THEME_TOKENS[id]
    expect(document.documentElement.style.colorScheme).toBe('light')
    expect(document.body.hasAttribute(DARK_ATTRIBUTE)).toBe(false)
    expect(document.body.style.getPropertyValue('--dsw-alias-bg-base')).toBe(
      tokens['--dsw-alias-bg-base'],
    )
    expect(document.body.style.getPropertyValue('--dsw-specific-sidebar-fill')).toBe(
      tokens['--dsw-specific-sidebar-fill'],
    )
    expect(document.body.style.getPropertyValue(displayToken)).toBe('block')
  })

  it.each([
    [new Date(2026, 0, 1, 8, 0, 0, 0), NEW_YEAR_THEME_ID],
    [new Date(2026, 6, 17, 8, 0, 0, 0), BIRTHDAY_THEME_ID],
    [new Date(2026, 1, 17, 8, 0, 0, 0), SPRING_FESTIVAL_THEME_ID],
    [new Date(2026, 8, 25, 8, 0, 0, 0), MID_AUTUMN_THEME_ID],
    [new Date(2026, 9, 1, 8, 0, 0, 0), NATIONAL_DAY_THEME_ID],
  ] as const)('lets system resolve to %s during the local event window', (sample, id) => {
    vi.useFakeTimers()
    vi.setSystemTime(sample)
    mockSystemDark(true)
    executeBootstrap('system')
    const tokens = SEASONAL_THEME_TOKENS[id]
    expect(document.documentElement.style.colorScheme).toBe('light')
    expect(document.body.hasAttribute(DARK_ATTRIBUTE)).toBe(false)
    expect(document.body.style.getPropertyValue('--dsw-alias-bg-base')).toBe(
      tokens['--dsw-alias-bg-base'],
    )
  })
})
