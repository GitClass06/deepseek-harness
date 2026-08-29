/** Built-in theme token tables and calendar-triggered theme resolution. */

import {
  BIRTHDAY_THEME_ID,
  MID_AUTUMN_THEME_ID,
  NATIONAL_DAY_THEME_ID,
  NEW_YEAR_THEME_ID,
  SPRING_FESTIVAL_THEME_ID,
  type SeasonalThemePreference,
} from './theme-settings.ts'

/** Token dictionary shared by ThemeRuntime and the pre-plugin bootstrap. */
export type BuiltinThemeTokens = Readonly<Record<string, string>>

interface SeasonalTokenSpec {
  readonly base: string
  readonly layer1: string
  readonly layer2: string
  readonly layer3: string
  readonly module: string
  readonly overlay: string
  readonly pageFill: string
  readonly borderSubtle: string
  readonly borderNormal: string
  readonly borderThin: string
  readonly borderStrong: string
  readonly primary: string
  readonly primaryHover: string
  readonly primaryInvert: string
  readonly brandText: string
  readonly labelPrimary: string
  readonly labelSecondary: string
  readonly labelTertiary: string
  readonly labelCaption: string
  readonly labelDimmed: string
  readonly hover: string
  readonly hoverAccent: string
  readonly hoverSolid: string
  readonly active: string
  readonly bubble: string
  readonly bubbleHighlight: string
  readonly sidebarFill: string
  readonly sidebarLabelPrimary: string
  readonly sidebarLabelSecondary: string
  readonly sidebarLabelTertiary: string
  readonly sidebarLabelCaption: string
  readonly sidebarLabelDimmed: string
  readonly sidebarNavActive: string
  readonly sidebarNavActiveAccent: string
  readonly sidebarNavHover: string
  readonly sidebarButtonBorder: string
  readonly sidebarButtonFill: string
  readonly sidebarButtonHover: string
  readonly sidebarButtonLabel: string
  readonly sidebarButtonShadow: string
  readonly settingsNavActive: string
  readonly settingsNavHover: string
  readonly warnLabel: string
  readonly warnPrimary: string
  readonly warnSecondary: string
  readonly warnTertiary: string
  readonly scrollbarBg1: string
  readonly scrollbarBg2: string
  readonly scrollbarHover1: string
  readonly scrollbarHover2: string
  readonly decorationDisplayToken: string
}

function seasonalTokens(spec: SeasonalTokenSpec): BuiltinThemeTokens {
  return Object.freeze({
    '--dsw-alias-bg-base': spec.base,
    '--dsw-alias-bg-layer-1': spec.layer1,
    '--dsw-alias-bg-layer-2': spec.layer2,
    '--dsw-alias-bg-layer-3': spec.layer3,
    '--dsw-alias-bg-module-platform': spec.module,
    '--dsw-alias-bg-multi-select': spec.module,
    '--dsw-alias-bg-overlay': spec.overlay,
    '--dsw-alias-border-l1': spec.borderSubtle,
    '--dsw-alias-border-l2': spec.borderNormal,
    '--dsw-alias-border-l2-darkmode-thin': spec.borderThin,
    '--dsw-alias-border-l3': spec.borderStrong,
    '--dsw-alias-brand-primary': spec.primary,
    '--dsw-alias-brand-primary-invert': spec.primaryInvert,
    '--dsw-alias-brand-primary-new-colorprimary-new-color': spec.primary,
    '--dsw-alias-brand-text': spec.brandText,
    '--dsw-alias-button-elevated-fill': spec.layer1,
    '--dsw-alias-button-floating-fill': spec.layer1,
    '--dsw-alias-button-floating-hover': spec.layer3,
    '--dsw-alias-button-info-fill': spec.primary,
    '--dsw-alias-button-info-hover': spec.primaryHover,
    '--dsw-alias-button-primary-dimmed': spec.active,
    '--dsw-alias-button-primary-fill': spec.primary,
    '--dsw-alias-button-primary-hover': spec.primaryHover,
    '--dsw-alias-interactive-bg-active': spec.active,
    '--dsw-alias-interactive-bg-hover-accent': spec.hoverAccent,
    '--dsw-alias-interactive-bg-hover-solid': spec.hoverSolid,
    '--dsw-alias-interactive-bg-hover': spec.hover,
    '--dsw-alias-label-caption': spec.labelCaption,
    '--dsw-alias-label-dimmed': spec.labelDimmed,
    '--dsw-alias-label-primary-bluish': spec.primary,
    '--dsw-alias-label-primary-dimmed': spec.brandText,
    '--dsw-alias-label-primary-foreground': 'rgb(255, 255, 255)',
    '--dsw-alias-label-primary-inverted': 'rgb(255, 255, 255)',
    '--dsw-alias-label-primary': spec.labelPrimary,
    '--dsw-alias-label-secondary': spec.labelSecondary,
    '--dsw-alias-label-tertiary': spec.labelTertiary,
    '--dsw-alias-scrollbar-bg-l1': spec.scrollbarBg1,
    '--dsw-alias-scrollbar-bg-l2': spec.scrollbarBg2,
    '--dsw-alias-scrollbar-hover-l1': spec.scrollbarHover1,
    '--dsw-alias-scrollbar-hover-l2': spec.scrollbarHover2,
    '--dsw-alias-state-business-primary': spec.primary,
    '--dsw-alias-state-business-tertiary': spec.active,
    '--dsw-alias-state-warn-label': spec.warnLabel,
    '--dsw-alias-state-warn-primary': spec.warnPrimary,
    '--dsw-alias-state-warn-secondary': spec.warnSecondary,
    '--dsw-alias-state-warn-tertiary': spec.warnTertiary,
    '--dsw-specific-app-frame-fill': spec.pageFill,
    '--dsw-specific-bubble-highlight': spec.bubbleHighlight,
    '--dsw-specific-bubble': spec.bubble,
    '--dsw-specific-conversation-fill': spec.pageFill,
    '--dsw-specific-input-major': spec.layer1,
    '--dsw-specific-menu': spec.overlay,
    '--dsw-specific-selector': spec.module,
    '--dsw-specific-sidebar-fill': spec.sidebarFill,
    '--dsw-specific-sidebar-label-caption': spec.sidebarLabelCaption,
    '--dsw-specific-sidebar-label-dimmed': spec.sidebarLabelDimmed,
    '--dsw-specific-sidebar-label-primary-bluish': spec.primaryInvert,
    '--dsw-specific-sidebar-label-primary-dimmed': spec.sidebarLabelSecondary,
    '--dsw-specific-sidebar-label-primary': spec.sidebarLabelPrimary,
    '--dsw-specific-sidebar-label-secondary': spec.sidebarLabelSecondary,
    '--dsw-specific-sidebar-label-tertiary': spec.sidebarLabelTertiary,
    '--dsw-specific-sidebar-new-session-border': spec.sidebarButtonBorder,
    '--dsw-specific-sidebar-new-session-fill': spec.sidebarButtonFill,
    '--dsw-specific-sidebar-new-session-hover': spec.sidebarButtonHover,
    '--dsw-specific-sidebar-new-session-label': spec.sidebarButtonLabel,
    '--dsw-specific-sidebar-new-session-shadow': spec.sidebarButtonShadow,
    '--dsw-specific-sidebar-nav-item-active-accent': spec.sidebarNavActiveAccent,
    '--dsw-specific-sidebar-nav-item-active': spec.sidebarNavActive,
    '--dsw-specific-sidebar-nav-item-hover': spec.sidebarNavHover,
    [spec.decorationDisplayToken]: 'block',
    '--dsw-specific-settings-panel-label-caption': spec.labelCaption,
    '--dsw-specific-settings-panel-label-dimmed': spec.labelDimmed,
    '--dsw-specific-settings-panel-label-primary-bluish': spec.primary,
    '--dsw-specific-settings-panel-label-primary-dimmed': spec.brandText,
    '--dsw-specific-settings-panel-label-primary': spec.labelPrimary,
    '--dsw-specific-settings-panel-label-secondary': spec.labelSecondary,
    '--dsw-specific-settings-panel-label-tertiary': spec.labelTertiary,
    '--dsw-specific-settings-panel-nav-item-active': spec.settingsNavActive,
    '--dsw-specific-settings-panel-nav-item-hover': spec.settingsNavHover,
    '--dsw-specific-tip': spec.module,
  })
}

const NEW_YEAR_PAGE_FILL = [
  'radial-gradient(circle at 82% 14%, rgba(246, 196, 83, 0.22) 0 44px, transparent 112px)',
  'radial-gradient(circle at 12% 10%, rgba(37, 99, 235, 0.13) 0 56px, transparent 142px)',
  'linear-gradient(135deg, rgb(244, 248, 255) 0%, rgb(232, 241, 255) 54%, rgb(248, 243, 231) 100%)',
].join(', ')

const BIRTHDAY_PAGE_FILL = [
  'radial-gradient(circle at 84% 16%, rgba(78, 194, 186, 0.18) 0 50px, transparent 122px)',
  'radial-gradient(circle at 12% 12%, rgba(225, 93, 116, 0.13) 0 62px, transparent 148px)',
  'linear-gradient(135deg, rgb(255, 246, 249) 0%, rgb(255, 236, 244) 55%, rgb(238, 251, 250) 100%)',
].join(', ')

const SPRING_FESTIVAL_PAGE_FILL = [
  'radial-gradient(circle at 82% 12%, rgba(250, 204, 21, 0.2) 0 52px, transparent 124px)',
  'radial-gradient(circle at 10% 14%, rgba(220, 38, 38, 0.12) 0 64px, transparent 152px)',
  'linear-gradient(135deg, rgb(255, 247, 237) 0%, rgb(255, 235, 221) 52%, rgb(255, 246, 230) 100%)',
].join(', ')

const MID_AUTUMN_PAGE_FILL = [
  'radial-gradient(circle at 84% 14%, rgba(246, 196, 83, 0.22) 0 60px, transparent 138px)',
  'radial-gradient(circle at 12% 12%, rgba(20, 184, 166, 0.12) 0 54px, transparent 136px)',
  'linear-gradient(135deg, rgb(243, 250, 249) 0%, rgb(231, 245, 244) 54%, rgb(255, 247, 229) 100%)',
].join(', ')

const NATIONAL_DAY_PAGE_FILL = [
  'radial-gradient(circle at 86% 14%, rgba(255, 215, 0, 0.16) 0 48px, transparent 96px)',
  'radial-gradient(circle at 10% 8%, rgba(222, 41, 16, 0.1) 0 56px, transparent 140px)',
  'linear-gradient(135deg, rgb(255, 245, 245) 0%, rgb(255, 232, 232) 50%, rgb(255, 240, 230) 100%)',
].join(', ')

/** New Year's Day's built-in palette, based on the Calicat seasonal shell. */
export const NEW_YEAR_TOKENS = seasonalTokens({
  base: 'rgb(244, 248, 255)',
  layer1: 'rgb(255, 255, 255)',
  layer2: 'rgb(248, 251, 255)',
  layer3: 'rgb(236, 244, 255)',
  module: 'rgb(232, 241, 255)',
  overlay: 'rgb(248, 251, 255)',
  pageFill: NEW_YEAR_PAGE_FILL,
  borderSubtle: 'rgba(37, 99, 235, 0.12)',
  borderNormal: 'rgba(37, 99, 235, 0.18)',
  borderThin: 'rgba(246, 196, 83, 0.34)',
  borderStrong: 'rgba(37, 99, 235, 0.24)',
  primary: 'rgb(37, 99, 235)',
  primaryHover: 'rgb(30, 64, 175)',
  primaryInvert: 'rgb(246, 196, 83)',
  brandText: 'rgb(30, 64, 175)',
  labelPrimary: 'rgb(18, 34, 74)',
  labelSecondary: 'rgb(55, 75, 118)',
  labelTertiary: 'rgb(82, 103, 148)',
  labelCaption: 'rgba(55, 75, 118, 0.72)',
  labelDimmed: 'rgba(55, 75, 118, 0.48)',
  hover: 'rgba(37, 99, 235, 0.08)',
  hoverAccent: 'rgba(246, 196, 83, 0.22)',
  hoverSolid: 'rgb(232, 241, 255)',
  active: 'rgba(37, 99, 235, 0.14)',
  bubble: 'rgb(235, 244, 255)',
  bubbleHighlight: 'rgb(218, 233, 255)',
  sidebarFill: 'rgb(28, 48, 95)',
  sidebarLabelPrimary: 'rgb(248, 251, 255)',
  sidebarLabelSecondary: 'rgba(248, 251, 255, 0.82)',
  sidebarLabelTertiary: 'rgba(248, 251, 255, 0.62)',
  sidebarLabelCaption: 'rgba(248, 251, 255, 0.52)',
  sidebarLabelDimmed: 'rgba(248, 251, 255, 0.36)',
  sidebarNavActive: 'rgba(246, 196, 83, 0.18)',
  sidebarNavActiveAccent: 'rgb(246, 196, 83)',
  sidebarNavHover: 'rgba(255, 255, 255, 0.1)',
  sidebarButtonBorder: 'rgba(246, 196, 83, 0.72)',
  sidebarButtonFill: 'rgb(255, 255, 255)',
  sidebarButtonHover: 'rgb(236, 244, 255)',
  sidebarButtonLabel: 'rgb(28, 48, 95)',
  sidebarButtonShadow: '0 10px 22px rgba(28, 48, 95, 0.18)',
  settingsNavActive: 'rgba(246, 196, 83, 0.24)',
  settingsNavHover: 'rgba(37, 99, 235, 0.08)',
  warnLabel: 'rgb(143, 96, 11)',
  warnPrimary: 'rgb(246, 196, 83)',
  warnSecondary: 'rgb(250, 213, 104)',
  warnTertiary: 'rgba(246, 196, 83, 0.24)',
  scrollbarBg1: 'rgba(37, 99, 235, 0.22)',
  scrollbarBg2: 'rgba(37, 99, 235, 0.28)',
  scrollbarHover1: 'rgba(37, 99, 235, 0.36)',
  scrollbarHover2: 'rgba(37, 99, 235, 0.42)',
  decorationDisplayToken: '--dsw-specific-new-year-decoration-display',
})

/** Birthday's built-in palette, based on the Calicat seasonal shell. */
export const BIRTHDAY_TOKENS = seasonalTokens({
  base: 'rgb(255, 246, 249)',
  layer1: 'rgb(255, 255, 255)',
  layer2: 'rgb(255, 250, 252)',
  layer3: 'rgb(255, 239, 246)',
  module: 'rgb(255, 235, 243)',
  overlay: 'rgb(255, 250, 252)',
  pageFill: BIRTHDAY_PAGE_FILL,
  borderSubtle: 'rgba(225, 93, 116, 0.12)',
  borderNormal: 'rgba(225, 93, 116, 0.18)',
  borderThin: 'rgba(78, 194, 186, 0.34)',
  borderStrong: 'rgba(225, 93, 116, 0.24)',
  primary: 'rgb(225, 93, 116)',
  primaryHover: 'rgb(172, 58, 82)',
  primaryInvert: 'rgb(78, 194, 186)',
  brandText: 'rgb(172, 58, 82)',
  labelPrimary: 'rgb(87, 31, 47)',
  labelSecondary: 'rgb(121, 58, 74)',
  labelTertiary: 'rgb(154, 82, 101)',
  labelCaption: 'rgba(121, 58, 74, 0.72)',
  labelDimmed: 'rgba(121, 58, 74, 0.48)',
  hover: 'rgba(225, 93, 116, 0.08)',
  hoverAccent: 'rgba(78, 194, 186, 0.2)',
  hoverSolid: 'rgb(255, 239, 246)',
  active: 'rgba(225, 93, 116, 0.14)',
  bubble: 'rgb(255, 241, 247)',
  bubbleHighlight: 'rgb(255, 225, 237)',
  sidebarFill: 'rgb(118, 52, 75)',
  sidebarLabelPrimary: 'rgb(255, 250, 252)',
  sidebarLabelSecondary: 'rgba(255, 250, 252, 0.82)',
  sidebarLabelTertiary: 'rgba(255, 250, 252, 0.62)',
  sidebarLabelCaption: 'rgba(255, 250, 252, 0.52)',
  sidebarLabelDimmed: 'rgba(255, 250, 252, 0.36)',
  sidebarNavActive: 'rgba(78, 194, 186, 0.18)',
  sidebarNavActiveAccent: 'rgb(78, 194, 186)',
  sidebarNavHover: 'rgba(255, 255, 255, 0.1)',
  sidebarButtonBorder: 'rgba(78, 194, 186, 0.72)',
  sidebarButtonFill: 'rgb(255, 255, 255)',
  sidebarButtonHover: 'rgb(255, 239, 246)',
  sidebarButtonLabel: 'rgb(118, 52, 75)',
  sidebarButtonShadow: '0 10px 22px rgba(118, 52, 75, 0.18)',
  settingsNavActive: 'rgba(78, 194, 186, 0.22)',
  settingsNavHover: 'rgba(225, 93, 116, 0.08)',
  warnLabel: 'rgb(154, 82, 31)',
  warnPrimary: 'rgb(245, 179, 74)',
  warnSecondary: 'rgb(249, 198, 103)',
  warnTertiary: 'rgba(245, 179, 74, 0.24)',
  scrollbarBg1: 'rgba(225, 93, 116, 0.22)',
  scrollbarBg2: 'rgba(225, 93, 116, 0.28)',
  scrollbarHover1: 'rgba(225, 93, 116, 0.36)',
  scrollbarHover2: 'rgba(225, 93, 116, 0.42)',
  decorationDisplayToken: '--dsw-specific-birthday-decoration-display',
})

/** Spring Festival's built-in palette, based on the Calicat seasonal shell. */
export const SPRING_FESTIVAL_TOKENS = seasonalTokens({
  base: 'rgb(255, 247, 237)',
  layer1: 'rgb(255, 255, 255)',
  layer2: 'rgb(255, 251, 242)',
  layer3: 'rgb(255, 241, 224)',
  module: 'rgb(255, 236, 214)',
  overlay: 'rgb(255, 251, 242)',
  pageFill: SPRING_FESTIVAL_PAGE_FILL,
  borderSubtle: 'rgba(220, 38, 38, 0.12)',
  borderNormal: 'rgba(220, 38, 38, 0.18)',
  borderThin: 'rgba(250, 204, 21, 0.34)',
  borderStrong: 'rgba(220, 38, 38, 0.24)',
  primary: 'rgb(220, 38, 38)',
  primaryHover: 'rgb(153, 27, 27)',
  primaryInvert: 'rgb(250, 204, 21)',
  brandText: 'rgb(153, 27, 27)',
  labelPrimary: 'rgb(82, 21, 14)',
  labelSecondary: 'rgb(126, 52, 31)',
  labelTertiary: 'rgb(160, 82, 45)',
  labelCaption: 'rgba(126, 52, 31, 0.72)',
  labelDimmed: 'rgba(126, 52, 31, 0.48)',
  hover: 'rgba(220, 38, 38, 0.08)',
  hoverAccent: 'rgba(250, 204, 21, 0.22)',
  hoverSolid: 'rgb(255, 235, 221)',
  active: 'rgba(220, 38, 38, 0.14)',
  bubble: 'rgb(255, 242, 225)',
  bubbleHighlight: 'rgb(255, 224, 204)',
  sidebarFill: 'rgb(134, 25, 38)',
  sidebarLabelPrimary: 'rgb(255, 250, 230)',
  sidebarLabelSecondary: 'rgba(255, 250, 230, 0.82)',
  sidebarLabelTertiary: 'rgba(255, 250, 230, 0.62)',
  sidebarLabelCaption: 'rgba(255, 250, 230, 0.52)',
  sidebarLabelDimmed: 'rgba(255, 250, 230, 0.36)',
  sidebarNavActive: 'rgba(250, 204, 21, 0.18)',
  sidebarNavActiveAccent: 'rgb(250, 204, 21)',
  sidebarNavHover: 'rgba(255, 255, 255, 0.1)',
  sidebarButtonBorder: 'rgba(250, 204, 21, 0.72)',
  sidebarButtonFill: 'rgb(255, 255, 255)',
  sidebarButtonHover: 'rgb(255, 241, 224)',
  sidebarButtonLabel: 'rgb(134, 25, 38)',
  sidebarButtonShadow: '0 10px 22px rgba(134, 25, 38, 0.18)',
  settingsNavActive: 'rgba(250, 204, 21, 0.24)',
  settingsNavHover: 'rgba(220, 38, 38, 0.08)',
  warnLabel: 'rgb(160, 82, 45)',
  warnPrimary: 'rgb(250, 204, 21)',
  warnSecondary: 'rgb(255, 215, 0)',
  warnTertiary: 'rgba(250, 204, 21, 0.24)',
  scrollbarBg1: 'rgba(220, 38, 38, 0.22)',
  scrollbarBg2: 'rgba(220, 38, 38, 0.28)',
  scrollbarHover1: 'rgba(220, 38, 38, 0.36)',
  scrollbarHover2: 'rgba(220, 38, 38, 0.42)',
  decorationDisplayToken: '--dsw-specific-spring-festival-decoration-display',
})

/** Mid-Autumn's built-in palette, based on the Calicat seasonal shell. */
export const MID_AUTUMN_TOKENS = seasonalTokens({
  base: 'rgb(243, 250, 249)',
  layer1: 'rgb(255, 255, 255)',
  layer2: 'rgb(249, 253, 252)',
  layer3: 'rgb(231, 245, 244)',
  module: 'rgb(224, 242, 241)',
  overlay: 'rgb(249, 253, 252)',
  pageFill: MID_AUTUMN_PAGE_FILL,
  borderSubtle: 'rgba(13, 116, 128, 0.12)',
  borderNormal: 'rgba(13, 116, 128, 0.18)',
  borderThin: 'rgba(246, 196, 83, 0.34)',
  borderStrong: 'rgba(13, 116, 128, 0.24)',
  primary: 'rgb(13, 116, 128)',
  primaryHover: 'rgb(21, 83, 94)',
  primaryInvert: 'rgb(246, 196, 83)',
  brandText: 'rgb(21, 83, 94)',
  labelPrimary: 'rgb(20, 55, 63)',
  labelSecondary: 'rgb(48, 87, 94)',
  labelTertiary: 'rgb(74, 116, 122)',
  labelCaption: 'rgba(48, 87, 94, 0.72)',
  labelDimmed: 'rgba(48, 87, 94, 0.48)',
  hover: 'rgba(13, 116, 128, 0.08)',
  hoverAccent: 'rgba(246, 196, 83, 0.22)',
  hoverSolid: 'rgb(231, 245, 244)',
  active: 'rgba(13, 116, 128, 0.14)',
  bubble: 'rgb(230, 247, 245)',
  bubbleHighlight: 'rgb(209, 238, 236)',
  sidebarFill: 'rgb(24, 78, 94)',
  sidebarLabelPrimary: 'rgb(249, 253, 252)',
  sidebarLabelSecondary: 'rgba(249, 253, 252, 0.82)',
  sidebarLabelTertiary: 'rgba(249, 253, 252, 0.62)',
  sidebarLabelCaption: 'rgba(249, 253, 252, 0.52)',
  sidebarLabelDimmed: 'rgba(249, 253, 252, 0.36)',
  sidebarNavActive: 'rgba(246, 196, 83, 0.18)',
  sidebarNavActiveAccent: 'rgb(246, 196, 83)',
  sidebarNavHover: 'rgba(255, 255, 255, 0.1)',
  sidebarButtonBorder: 'rgba(246, 196, 83, 0.72)',
  sidebarButtonFill: 'rgb(255, 255, 255)',
  sidebarButtonHover: 'rgb(231, 245, 244)',
  sidebarButtonLabel: 'rgb(24, 78, 94)',
  sidebarButtonShadow: '0 10px 22px rgba(24, 78, 94, 0.18)',
  settingsNavActive: 'rgba(246, 196, 83, 0.24)',
  settingsNavHover: 'rgba(13, 116, 128, 0.08)',
  warnLabel: 'rgb(143, 96, 11)',
  warnPrimary: 'rgb(246, 196, 83)',
  warnSecondary: 'rgb(250, 213, 104)',
  warnTertiary: 'rgba(246, 196, 83, 0.24)',
  scrollbarBg1: 'rgba(13, 116, 128, 0.22)',
  scrollbarBg2: 'rgba(13, 116, 128, 0.28)',
  scrollbarHover1: 'rgba(13, 116, 128, 0.36)',
  scrollbarHover2: 'rgba(13, 116, 128, 0.42)',
  decorationDisplayToken: '--dsw-specific-mid-autumn-decoration-display',
})

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

/** Built-in seasonal token tables keyed by their theme id. */
export const SEASONAL_THEME_TOKENS = Object.freeze({
  [NEW_YEAR_THEME_ID]: NEW_YEAR_TOKENS,
  [BIRTHDAY_THEME_ID]: BIRTHDAY_TOKENS,
  [SPRING_FESTIVAL_THEME_ID]: SPRING_FESTIVAL_TOKENS,
  [MID_AUTUMN_THEME_ID]: MID_AUTUMN_TOKENS,
  [NATIONAL_DAY_THEME_ID]: NATIONAL_DAY_TOKENS,
}) satisfies Readonly<Record<SeasonalThemePreference, BuiltinThemeTokens>>

function chineseCalendarParts(date: Date): Intl.DateTimeFormatPart[] | undefined {
  try {
    return new Intl.DateTimeFormat('en-US-u-ca-chinese', {
      month: 'numeric',
      day: 'numeric',
    }).formatToParts(date)
  } catch {
    // Some JS runtimes can omit Chinese-calendar data; fixed-date events still resolve.
  }
  return undefined
}

function chineseCalendarDay(date: Date): { month: number; day: number } | undefined {
  const parts = chineseCalendarParts(date)
  if (parts === undefined) return undefined
  const month = Number.parseInt(parts.find(part => part.type === 'month')?.value ?? '', 10)
  const day = Number.parseInt(parts.find(part => part.type === 'day')?.value ?? '', 10)
  return Number.isFinite(month) && Number.isFinite(day) ? { month, day } : undefined
}

/**
 * Resolve the calendar-owned product theme for the browser's local day.
 * @param ms - sample time in Unix milliseconds.
 * @returns a seasonal theme id on a supported local event day; otherwise undefined.
 */
export function calendarThemePreferenceAt(ms: number = Date.now()): SeasonalThemePreference | undefined {
  const date = new Date(ms)
  const month = date.getMonth()
  const day = date.getDate()
  if (month === 0 && day === 1) return NEW_YEAR_THEME_ID
  if (month === 6 && day === 17) return BIRTHDAY_THEME_ID
  const chinese = chineseCalendarDay(date)
  if (chinese?.month === 1 && chinese.day === 1) return SPRING_FESTIVAL_THEME_ID
  if (chinese?.month === 8 && chinese.day === 15) return MID_AUTUMN_THEME_ID
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
