# Agent Note: Seasonal event themes

Status: implemented

English | [中文](2026-08-29-seasonal-event-themes.zh.md)

## Problem

The Web client had neutral Light, Dark, and System preferences plus one National Day theme. New Year, birthday, Spring Festival, and Mid-Autumn presentations needed to reuse the existing Web shell layout, persist through the same Host-backed Appearance preference, and switch automatically when the local event day starts without requiring a page-specific fork of the home screen.

## Decision

`new-year`, `birthday`, `spring-festival`, `mid-autumn`, and `national-day` are built-in `ThemePreference` values and registered `ThemeDefinition`s. Each uses the light base color scheme and overrides existing alias tokens through a shared seasonal token helper. The Appearance settings row exposes the five event themes after Light, Dark, and System, with one shared SVG icon component per theme.

`system` resolves through `calendarThemePreferenceAt()` before consulting `prefers-color-scheme`. The local event calendar maps January 1 to `new-year`, July 17 to `birthday`, Chinese lunar month 1 day 1 to `spring-festival`, Chinese lunar month 8 day 15 to `mid-autumn`, and October 1-7 to `national-day`. Fixed-date events resolve before lunar events, and Mid-Autumn resolves before the National Day range if the lunar date overlaps the October holiday window. Explicit concrete preferences still win over the calendar, while the system preference schedules a local-date timer and republishes `theme/change` only when the resolved theme id changes.

ThemeRuntime tracks the latest pending built-in preference write. A Host snapshot older than that write cannot adopt over the clicked preference; once the write settles, the runtime either keeps the accepted preference or adopts the recovered durable value. This keeps seasonal selections from flashing and then reverting when an initial settings read finishes after the user clicks a cube.

The pre-plugin bootstrap embeds the same seasonal token table and date resolver. It writes `color-scheme`, `body[data-ds-dark-theme]`, and the active built-in theme token variables before the shell loading page or dynamic plugin tree renders; ThemeRuntime and ui-layout remain authoritative after activation, as in the [pre-plugin bootstrap decision](../bug-fix/2026-08-10-pre-plugin-theme-bootstrap.md).

The themes stay token-driven rather than layout-driven. ui-conversation renders `SeasonalHeroDecor`, which contains one non-interactive SVG layer per event in the same absolute plane. Each layer defaults to hidden through its own `--dsw-specific-*-decoration-display` token, so a theme can show event artwork behind the existing Hero controls without replacing the tree or moving the composer, workspace picker, sidebar, or settings panel.

## Verification

`ui-theme` unit tests cover the durable schema, runtime registry, seasonal token tables, pending Host-write fence, fixed and lunar calendar resolution, midnight recheck, bootstrap token write, Appearance row copy, and Host collection. `ui-primitives` icon tests include the new SVG exports under the currentColor/no-hardcoded-palette rule. `ui-conversation` tests cover every seasonal SVG layer and motif count. The Web settings e2e drives the shipped dialog through every seasonal cube, checks `settings.yaml`, verifies body token changes, settings-panel token resets, New Session computed colors, and active SVG ornament counts, then reloads and opens a second port against the same settings home.

## Alternatives considered

**Register seasonal themes as third-party themes.** Third-party ids are process-local and deliberately do not cross the Host settings schema. That would lose persistence and pre-plugin bootstrap behavior, so it cannot serve product Appearance options.

**Add separate seasonal home pages or alternate hero trees.** The requirement is a theme over the existing layout. Parallel pages would duplicate the hero/composer/sidebar structure and create more surfaces to keep in sync with session and workspace behavior.

**Make users choose seasonal themes manually.** Explicit options are useful outside event days, but a System user should not need a refresh or manual switch when a local event day starts. Calendar resolution gives that active update without changing explicit preferences.

**Use a single generic decoration token.** One token could only show or hide a shared layer. Per-event display tokens let each theme show its own motif while keeping all decoration layers in the same absolute layout plane.

## Consequences

System mode now has several date-sensitive branches. Tests that assert resolved System color must either sample outside the event dates or set the clock deliberately. Lunar event resolution depends on `Intl.DateTimeFormat` support for the Chinese calendar; runtimes without that data still resolve the fixed-date events.
