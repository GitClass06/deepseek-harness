// Hero chrome for the blank-draft phase of ConversationRoot: fish headline,
// glow backdrop, and the workspace row. Pure presentation — the resident
// composer is NOT rendered here (it keeps its own stable tree position in
// ConversationRoot so the textarea survives the hero → composer flip); CSS
// positions it over this shell's glow area during the hero phase.

import { useId } from 'react'
import type { ReactNode, RefObject } from 'react'
import {
  FishLogo, IconChevronDownOutline14, IconFolderClose16, IconFolderOpen16,
} from '@deepseek-ai/dsh-client-ui-primitives'
import { workspaceTitleOf } from '@deepseek-ai/dsh-client-runtime/client'
import type { ConversationSlotProps } from '../contract/slots.ts'
import css from './HeroShell.module.css'

/** The owner's locale seat type, passed to hero chrome as a plain prop. */
type HeroTranslate = ConversationSlotProps['t']

/**
 * Basename label for the workspace chip (the shared derivation);
 * separator-only paths echo the raw cwd.
 * @param cwd - workspace directory path (non-empty).
 * @returns chip label.
 */
export function workspaceLabel(cwd: string): string {
  const base = workspaceTitleOf(cwd)
  return base !== '' ? base : cwd
}

/**
 * The workspace chip (folder + label + chevron), always interactive: before
 * the first message the workspace stays switchable — picking another one
 * moves the New Session flow to that workspace's blank session. Without a
 * label the chip renders its placeholder state: closed folder + the
 * "Choose workspace" call to action.
 * @param props.label - chip label (see {@link workspaceLabel}); omitted → placeholder.
 * @param props.menuOpen - menu expansion echo.
 * @param props.onClick - menu toggle.
 * @returns the chip button element.
 */
export function WorkspaceChip({ buttonRef, label, menuOpen = false, onClick, t }: {
  buttonRef?: RefObject<HTMLButtonElement>
  label?: string | undefined
  menuOpen?: boolean
  onClick?: () => void
  t: HeroTranslate
}) {
  return (
    <button
      ref={buttonRef}
      type="button"
      className={css.workspace}
      aria-label={t('hero.chooseWorkspace')}
      aria-haspopup="menu"
      aria-expanded={menuOpen}
      onClick={onClick}
    >
      {label === undefined
        ? <IconFolderClose16 className={css.folder} size={16} />
        : <IconFolderOpen16 className={css.folder} size={16} />}
      <span className={css.workspaceLabel}>{label ?? t('hero.chooseWorkspace')}</span>
      <IconChevronDownOutline14 className={css.chevron} size={12} />
    </button>
  )
}

/**
 * The soft blue backdrop ellipse (figma 313:14109). Rendered by the hero
 * owner (ConversationRoot), not HeroShell, so it can center on the input
 * card; the owner's className supplies all positioning.
 * @param props.className - positioning class from the owner.
 * @returns the blurred-ellipse svg element.
 */
export function HeroGlow({ className }: { className?: string | undefined }) {
  // Stable filter id so multiple hero mounts do not collide in the DOM.
  const glowFilterId = `empty-glow-${useId().replace(/:/g, '')}`
  return (
    <svg className={className} viewBox="0 0 1051 468" fill="none" aria-hidden="true">
      <defs>
        <filter
          id={glowFilterId}
          x="0"
          y="0"
          width="1051"
          height="468"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="50" result="effect1_foregroundBlur" />
        </filter>
      </defs>
      <g filter={`url(#${glowFilterId})`}>
        <ellipse cx="525.5" cy="234" rx="425.5" ry="134" fill="#6187D8" fillOpacity="0.08" />
      </g>
    </svg>
  )
}

type HeroDecorProps = { className?: string | undefined }

/**
 * Non-interactive New Year's Day scene ornaments for the blank hero.
 * @param props.className - absolute-positioning class from the owner.
 * @returns the decorative SVG layer.
 */
export function NewYearHeroDecor({ className }: HeroDecorProps) {
  const burstId = `new-year-burst-${useId().replace(/:/g, '')}`
  return (
    <svg
      className={className}
      viewBox="0 0 1180 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      data-new-year-decor
    >
      <defs>
        <path id={burstId} d="M0 -58V-18M0 18V58M-58 0H-18M18 0H58M-41 -41-13 -13M13 13 41 41M41 -41 13 -13M-13 13-41 41" />
      </defs>
      <g className={css.decorBlue}>
        <use href={`#${burstId}`} transform="translate(150 120) scale(1.1)" data-new-year-firework />
        <use href={`#${burstId}`} transform="translate(1008 132) scale(.78) rotate(14)" data-new-year-firework />
      </g>
      <g className={css.decorGold}>
        <use href={`#${burstId}`} transform="translate(922 238) scale(.46) rotate(-8)" data-new-year-firework />
      </g>
      <g className={css.decorConfetti}>
        <circle cx="236" cy="210" r="7" data-new-year-confetti />
        <circle cx="270" cy="782" r="5" data-new-year-confetti />
        <circle cx="356" cy="152" r="4" data-new-year-confetti />
        <circle cx="768" cy="146" r="5" data-new-year-confetti />
        <circle cx="928" cy="766" r="6" data-new-year-confetti />
        <circle cx="1042" cy="624" r="4" data-new-year-confetti />
        <path d="M76 676l34 -14 13 31 -34 14Z" data-new-year-confetti />
        <path d="M416 742l38 10 -12 34 -37 -10Z" data-new-year-confetti />
        <path d="M654 204l30 -24 24 30 -30 24Z" data-new-year-confetti />
        <path d="M1104 300l24 24 -24 24 -24 -24Z" data-new-year-confetti />
      </g>
      <g className={css.decorSparkles}>
        <path d="M166 640h38M185 621v38" />
        <path d="M842 332h30M857 317v30" />
        <path d="M1036 520h26M1049 507v26" />
      </g>
    </svg>
  )
}

/**
 * Non-interactive birthday scene ornaments for the blank hero.
 * @param props.className - absolute-positioning class from the owner.
 * @returns the decorative SVG layer.
 */
export function BirthdayHeroDecor({ className }: HeroDecorProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 1180 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      data-birthday-decor
    >
      <g className={css.decorBalloonRose}>
        <ellipse cx="132" cy="156" rx="38" ry="48" data-birthday-balloon />
        <ellipse cx="1034" cy="168" rx="34" ry="44" data-birthday-balloon />
        <path d="M132 204l-10 17h20Z" />
        <path d="M1034 212l-9 16h18Z" />
      </g>
      <g className={css.decorBalloonTeal}>
        <ellipse cx="214" cy="132" rx="32" ry="42" data-birthday-balloon />
        <ellipse cx="970" cy="238" rx="30" ry="40" data-birthday-balloon />
        <ellipse cx="1060" cy="662" rx="30" ry="40" data-birthday-balloon />
        <path d="M214 174l-9 15h18Z" />
        <path d="M970 278l-9 15h18Z" />
        <path d="M1060 702l-9 15h18Z" />
      </g>
      <g className={css.decorBalloonStrings}>
        <path d="M132 221C116 302 182 364 142 444" />
        <path d="M214 189C196 270 260 334 220 418" />
        <path d="M970 293C950 368 1020 434 980 510" />
        <path d="M1034 228C1010 318 1092 382 1042 470" />
        <path d="M1060 717C1036 762 1084 802 1048 842" />
      </g>
      <g className={css.decorCake} data-birthday-cake>
        <path d="M806 704H1042C1062 704 1078 720 1078 740V800C1078 820 1062 836 1042 836H806C786 836 770 820 770 800V740C770 720 786 704 806 704Z" />
        <path d="M798 666H1050C1066 666 1078 679 1078 695V716H770V695C770 679 782 666 798 666Z" />
        <path className={css.decorCakeTrim} d="M810 716C834 746 866 746 890 716C914 746 946 746 970 716C994 746 1026 746 1050 716" />
        <path className={css.decorCandle} d="M850 610h18v56h-18ZM922 594h18v72h-18ZM994 610h18v56h-18Z" />
      </g>
      <g className={css.decorConfetti}>
        <path d="M80 604l34 -12 12 34 -34 12Z" data-birthday-confetti />
        <path d="M288 722l38 10 -12 34 -38 -10Z" data-birthday-confetti />
        <path d="M636 152l30 -24 24 30 -30 24Z" data-birthday-confetti />
        <circle cx="540" cy="232" r="6" data-birthday-confetti />
      </g>
    </svg>
  )
}

/**
 * Non-interactive Spring Festival scene ornaments for the blank hero.
 * @param props.className - absolute-positioning class from the owner.
 * @returns the decorative SVG layer.
 */
export function SpringFestivalHeroDecor({ className }: HeroDecorProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 1180 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      data-spring-festival-decor
    >
      <g className={css.decorLanternLine}>
        <path d="M72 104C208 62 332 108 470 82" />
        <path d="M732 96C858 58 1000 114 1124 78" />
      </g>
      <g className={css.decorLanternRed}>
        <g transform="translate(142 118)" data-spring-festival-lantern>
          <rect x="-22" y="-54" width="44" height="16" rx="8" />
          <ellipse cx="0" cy="0" rx="38" ry="52" />
          <rect x="-22" y="38" width="44" height="16" rx="8" />
          <path className={css.decorLanternGold} d="M-9 54h18v34H-9Z" />
        </g>
        <g transform="translate(910 126) scale(.88)" data-spring-festival-lantern>
          <rect x="-22" y="-54" width="44" height="16" rx="8" />
          <ellipse cx="0" cy="0" rx="38" ry="52" />
          <rect x="-22" y="38" width="44" height="16" rx="8" />
          <path className={css.decorLanternGold} d="M-9 54h18v34H-9Z" />
        </g>
      </g>
      <g className={css.decorLanternGold}>
        <g transform="translate(306 128) scale(.82)" data-spring-festival-lantern>
          <rect x="-22" y="-54" width="44" height="16" rx="8" />
          <ellipse cx="0" cy="0" rx="38" ry="52" />
          <rect x="-22" y="38" width="44" height="16" rx="8" />
          <path d="M-8 54h16v34H-8Z" />
        </g>
        <g transform="translate(1060 108) scale(.74)" data-spring-festival-lantern>
          <rect x="-22" y="-54" width="44" height="16" rx="8" />
          <ellipse cx="0" cy="0" rx="38" ry="52" />
          <rect x="-22" y="38" width="44" height="16" rx="8" />
          <path d="M-8 54h16v34H-8Z" />
        </g>
      </g>
      <g className={css.decorBranch}>
        <path d="M64 716C186 660 250 560 312 430" />
        <path d="M172 668C210 644 242 644 284 672" data-spring-festival-blossom />
        <path d="M218 584C250 558 292 558 326 586" data-spring-festival-blossom />
        <path d="M270 482C302 458 340 458 376 486" data-spring-festival-blossom />
      </g>
      <g className={css.decorSparkles}>
        <path d="M918 682h38M937 663v38" />
        <path d="M1028 530h28M1042 516v28" />
      </g>
    </svg>
  )
}

/**
 * Non-interactive Mid-Autumn scene ornaments for the blank hero.
 * @param props.className - absolute-positioning class from the owner.
 * @returns the decorative SVG layer.
 */
export function MidAutumnHeroDecor({ className }: HeroDecorProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 1180 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      data-mid-autumn-decor
    >
      <g className={css.decorMoon} data-mid-autumn-moon>
        <circle cx="964" cy="156" r="92" />
      </g>
      <g className={css.decorCloud}>
        <path d="M782 214C812 170 874 174 898 222C926 214 954 232 960 262H730C738 232 756 218 782 214Z" data-mid-autumn-cloud />
        <path d="M112 716C150 664 224 674 248 728C284 714 322 738 328 776H50C58 740 80 720 112 716Z" data-mid-autumn-cloud />
        <path d="M848 746C884 694 956 704 980 758C1014 744 1054 768 1060 806H782C790 770 814 750 848 746Z" data-mid-autumn-cloud />
      </g>
      <g className={css.decorLeaf}>
        <path d="M174 238C224 198 280 212 322 278C250 292 202 280 174 238Z" data-mid-autumn-leaf />
        <path d="M262 342C316 302 380 322 414 396C336 402 292 388 262 342Z" data-mid-autumn-leaf />
        <path d="M890 626C942 592 1000 614 1028 686C956 688 914 674 890 626Z" data-mid-autumn-leaf />
        <path d="M982 540C1028 512 1076 526 1108 586C1044 592 1006 578 982 540Z" data-mid-autumn-leaf />
      </g>
    </svg>
  )
}

/**
 * Non-interactive National Day scene ornaments for the blank hero.
 * @param props.className - absolute-positioning class from the owner.
 * @returns the decorative SVG layer.
 */
export function NationalDayHeroDecor({ className }: HeroDecorProps) {
  const starId = `national-day-star-${useId().replace(/:/g, '')}`
  return (
    <svg
      className={className}
      viewBox="0 0 1180 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      data-national-day-decor
    >
      <defs>
        <path
          id={starId}
          d="M0 -46 10.8 -14.9 43.7 -14.2 17.5 5.7 27 37.2 0 18.4 -27 37.2 -17.5 5.7 -43.7 -14.2 -10.8 -14.9Z"
        />
      </defs>
      <g className={css.decorStarWash}>
        <use href={`#${starId}`} transform="translate(96 92) scale(1.22)" data-national-day-star />
      </g>
      <g className={css.decorGold}>
        <use href={`#${starId}`} transform="translate(995 82) scale(.5)" data-national-day-star />
        <use href={`#${starId}`} transform="translate(1040 124) scale(.22) rotate(18)" data-national-day-star />
        <use href={`#${starId}`} transform="translate(958 134) scale(.18) rotate(-12)" data-national-day-star />
        <use href={`#${starId}`} transform="translate(1010 174) scale(.16) rotate(28)" data-national-day-star />
        <use href={`#${starId}`} transform="translate(1084 86) scale(.13) rotate(-20)" data-national-day-star />
      </g>
      <g className={css.decorBunting}>
        <path className={css.decorBuntingLine} d="M42 176C168 126 286 196 434 148" />
        <path className={css.decorFlagRed} d="M82 163 126 151 112 208Z" data-national-day-flag />
        <path className={css.decorFlagGold} d="M148 149 191 154 166 204Z" data-national-day-flag />
        <path className={css.decorFlagRed} d="M218 165 260 178 226 218Z" data-national-day-flag />
        <path className={css.decorFlagGold} d="M292 172 337 166 316 218Z" data-national-day-flag />
        <path className={css.decorFlagRed} d="M364 155 408 143 394 200Z" data-national-day-flag />
      </g>
      <g className={css.decorBuntingBottom}>
        <path className={css.decorBuntingLine} d="M654 774C800 716 954 816 1136 742" />
        <path className={css.decorFlagGold} d="M704 755 752 742 736 804Z" data-national-day-flag />
        <path className={css.decorFlagRed} d="M786 747 835 756 806 811Z" data-national-day-flag />
        <path className={css.decorFlagGold} d="M876 775 922 792 884 835Z" data-national-day-flag />
        <path className={css.decorFlagRed} d="M972 785 1022 777 998 836Z" data-national-day-flag />
        <path className={css.decorFlagGold} d="M1060 760 1104 742 1097 802Z" data-national-day-flag />
      </g>
      <g className={css.decorSparkles}>
        <path d="M154 730h38M173 711v38" />
        <path d="M944 246h30M959 231v30" />
        <path d="M1090 584h26M1103 571v26" />
      </g>
    </svg>
  )
}

/**
 * All seasonal hero decoration layers in the shared absolute plane.
 * @param props.className - absolute-positioning class from the owner.
 * @returns every decorative SVG layer; CSS tokens decide visibility.
 */
export function SeasonalHeroDecor({ className }: HeroDecorProps) {
  return (
    <>
      <NewYearHeroDecor className={className} />
      <BirthdayHeroDecor className={className} />
      <SpringFestivalHeroDecor className={className} />
      <MidAutumnHeroDecor className={className} />
      <NationalDayHeroDecor className={className} />
    </>
  )
}

/** Hero chrome props. The workspace row rides the InputBar accessory hole, not here. */
export interface HeroShellProps {
  /** The owner's locale seat, passed down as a plain prop. */
  t: HeroTranslate
  /** Authorized renderer for the hero brand-mark slot. */
  renderSlot: ConversationSlotProps['renderSlot']
  /** Overlay content after the stack (modals). */
  children?: ReactNode
}

/**
 * Render the hero chrome (headline only; no glow, no composer, no workspace
 * row — the glow is the owner's {@link HeroGlow}).
 * @param props - see {@link HeroShellProps}.
 * @returns the centered hero element tree.
 */
export function HeroShell({ t, renderSlot, children }: HeroShellProps) {
  return (
    <div className={css.root}>
      <div className={css.stack}>
        <div className={css.headline}>
          {/* figma 34:10412: fish 34×25 leading the headline, gap 10. */}
          <span className={css.fishHitbox}>
            {renderSlot('conversation.hero.brand.mark', { size: 34, className: css.fish }, {
              fallback: <FishLogo size={34} className={css.fish} />,
            })}
          </span>
          <span className={css.headlineText}>{t('hero.headline')}</span>
          <span className={css.previewBadge}>{t('hero.preview')}</span>
        </div>
        <div className={css.body}>
          {/* The resident composer (ConversationRoot's root-owned scrollport;
              the workspace row rides the stack above the card) is CSS-centered
              in that scroll body during hero — see
              ConversationRoot.module.css [data-phase='hero']. */}
        </div>
      </div>
      {children}
    </div>
  )
}
