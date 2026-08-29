# Agent Note: National Day theme

Status: implemented

English | [中文](2026-08-29-national-day-theme.zh.md)

## Problem

The Web client had neutral Light, Dark, and System preferences only. A seasonal National Day presentation needed to reuse the existing Web shell layout, persist through the same Host-backed Appearance preference, and update when the local holiday window begins or ends without requiring a page-specific fork of the home screen.

## Decision

`national-day` is a built-in `ThemePreference` and registered `ThemeDefinition`. It uses the light base color scheme and overrides existing alias tokens with the Calicat-derived red, gold, and warm-white palette. The Appearance settings row exposes it as a fourth cube with `IconNationalDayOutline16`, so the option uses the same SVG icon component convention as the rest of the settings surface.

`system` resolves through `calendarThemePreferenceAt()` before consulting `prefers-color-scheme`. The only calendar event today is National Day in the browser's local October 1-7 window. Explicit `light`, `dark`, and `national-day` choices still win over the calendar, while the system preference schedules a local-date timer and republishes `theme/change` only when the resolved theme id changes.

ThemeRuntime tracks the latest pending built-in preference write. A Host snapshot older than that write cannot adopt over the clicked preference; once the write settles, the runtime either keeps the accepted preference or adopts the recovered durable value. This keeps National Day from flashing and then reverting when an initial settings read finishes after the user clicks the cube.

The pre-plugin bootstrap embeds the same built-in National Day token table and date test. It writes `color-scheme`, `body[data-ds-dark-theme]`, and the National Day inline token variables before the shell loading page or dynamic plugin tree renders; ThemeRuntime and ui-layout remain authoritative after activation, as in the [pre-plugin bootstrap decision](../bug-fix/2026-08-10-pre-plugin-theme-bootstrap.md).

The theme stays token-driven rather than layout-driven. ui-layout rebinds label aliases only inside the sidebar grid cell through sidebar-specific tokens, allowing the red sidebar fill to keep readable text without retinting the conversation column. ui-sidebar lets the expanded New Session capsule read dedicated fill, border, label, hover, and shadow tokens so the primary action remains legible on the red column while collapsed rail controls keep their rail aliases. ui-conversation reads the optional `--dsw-specific-conversation-fill` background token on its resident root and falls back to `--dsw-alias-bg-base` for ordinary themes; it also renders a non-interactive SVG decoration layer whose display token defaults to hidden, letting National Day add five-star and bunting ornaments behind the existing Hero controls without replacing the tree. ui-settings-general resets inherited label and nav-fill aliases inside the fixed settings panel through settings-panel-specific tokens, because the panel mounts under `sidebar.settings` and would otherwise inherit sidebar text colors.

## Verification

`ui-theme` unit tests cover the durable schema, runtime registry, National Day token table, pending Host-write fence, calendar resolution, midnight recheck, bootstrap token write, Appearance row copy, and Host collection. `ui-primitives` icon tests include the new SVG export under the currentColor/no-hardcoded-palette contract. `ui-sidebar` and `ui-conversation` tests cover the New Session token hooks and the SVG star/bunting layer. The Web settings e2e drives the shipped dialog through the National Day cube, checks `settings.yaml`, verifies body token changes, settings-panel token resets, New Session computed colors, and visible National Day SVG ornament counts, then reloads and opens a second port against the same settings home.

## Alternatives considered

**Register National Day as a third-party theme.** Third-party ids are process-local and deliberately do not cross the Host settings schema. That would lose persistence and pre-plugin bootstrap behavior, so it cannot serve a product Appearance option.

**Add a separate National Day home page or alternate hero tree.** The requirement is a theme over the existing layout. A parallel page would duplicate the hero/composer/sidebar structure and create another surface to keep in sync with session and workspace behavior.

**Make users choose National Day manually every year.** The explicit option is useful outside the holiday window, but a System user should not need a refresh or manual switch when the local event window starts. Calendar resolution gives that active update without changing explicit preferences.

**Use global label overrides for the red sidebar.** A global text color that reads well on the dark red sidebar would fail on the warm conversation background, while a warm dark text would fail on the sidebar. Sidebar-scoped label tokens preserve both contrasts.

## Consequences

System mode now has one date-sensitive branch. Tests that assert resolved System color must either sample outside October 1-7 or account for the holiday window. New seasonal themes can reuse the same calendar helper, timer, and bootstrap token path, but each built-in preference still needs schema, settings-row copy, token, documentation, and assembled Web coverage.
