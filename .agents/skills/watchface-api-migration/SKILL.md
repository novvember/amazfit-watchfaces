---
name: watchface-api-migration
description: Migrate an amazfit-watchfaces watchface from Zepp OS API 1 to API 2. Use for planning or implementing a migration, including sensor adapters, manifest compatibility, type isolation, lifecycle, and behavior preservation.
---

# Migrating a Watchface from API 1 to API 2

Use this skill for a watchface migration, alongside `watchface-types` when changing code or types. The user's chosen API level, scope, and device evidence take precedence over examples or version labels in documentation.

## Establish the existing contract

- Read the target watchface's `app.json`, `app.js`, entry point, layouts, classes, translations, storage keys, and imported adapters. Compare the working tree with `HEAD` and note user edits before modifying anything. Record a type-check baseline where a local project exists.
- List observable behavior before replacing APIs: 12/24-hour formatting, leading zeros, date language, AOD and edit visibility, layer order, image geometry, persistence, sensor updates, and resume behavior. Preserve original algorithms, fallbacks, and naming unless an API difference requires a change. Make each deviation explainable in the diff.
- Verify uncertain API behavior against the Zepp OS documentation, the installed `@zeppos/device-types` declarations, and concrete external examples when useful. Repository API 2 watchfaces are not authoritative references. Distinguish documented support, observed device behavior, and inference. If a documented limitation would force a changed minimum API or visible behavior, raise that choice with the user rather than silently changing it.
- In a migration plan, name the expected files, API 2 adapter location, package changes, type project, build path, and checks for unintended effects. If implementation reveals a need to change other watchfaces, shared API 1 code, a dependency, or an agreed manifest value beyond that scope, explain the concrete options before taking that step. Continue work that does not depend on the choice.

## Move only the target watchface

- Keep changes to the target watchface, its needed API 2 adapters, and any necessary dependency or type configuration. Do not modify other watchfaces or API 1 adapters as a side effect. The user may ask for a different scope.
- Use `@zos/*` runtime modules directly. They are provided by Zepp OS; do not install them as npm packages or add local files that merely re-export `px`, UI constants, or other standard functions. `@zeppos/device-types` is a development dependency for checking JavaScript; inspect the installed version before adding or changing it.
- `src/adapters/` contains API 1 sensor adapters. Put API 2 sensor adapters in `src/adapters2/`; reuse functions from `src/utils/` only when they have no dependency on the other API's runtime. An API 2 adapter should consume the API 2 sensor object and preserve the old output contract where callers rely on it. For `Time`, `getMonth()` yields 1–12 and `getDay()` yields 1–7 (Monday first); use adapters for localized month and weekday keys when the watchface needs them.
- Select types through the watchface's local `jsconfig.json`, extending `jsconfig.api2.json`. API 1 watchfaces extend `jsconfig.api1.json` when they have a local config. The root `jsconfig.json` checks API 1 shared code; it does not partition watchfaces by their manifests. Keep API 2 declarations in `src/types/api_level_2/`, without referencing API 1 declarations or creating a common declaration layer just to deduplicate them. See `watchface-types` for targeted declaration repairs and compiler checks.

## Lifecycle and readable code

- Keep Zepp lifecycle names such as `onInit`, `build`, and `onDestroy`. Give internal composition methods names such as `_buildTime()` while preserving the target's structure. Create a widget class only for meaningful state, construction, or update behavior; avoid one-line components and extra wrapper files.
- Inspect each sensor event contract. For events with both `on…` and `off…`, use the same callback reference; for subscriptions needed only on the active face, `WIDGET_DELEGATE` can subscribe and refresh in `resume_call` and unsubscribe in `pause_call`. `Time.onPerMinute()` has no documented `offPerMinute()`: register it once per build, refresh on resume, and guard rendering by scene when needed. Do not register it on every resume or invent an unsubscribe method. This is a rule for the documented `Time` API, not a blanket rule for all API 2 sensors.
- Favor readable JavaScript and direct expressions. Use JSDoc when it clarifies a contract or fixes a real inference gap; routine lifecycle, build, update, and callback functions do not need `@returns {void}`. Do not add dense intersections, casts, repetitive comments, new helper files, or defensive validation unrelated to the input boundary solely to satisfy the type checker. Preserve the original algorithm where possible, especially random image selection and stored image IDs.

## Review and verification

- Review the full diff against the original behavior and list of intended files, not just a compiler result. Check that no other watchface or API 1 adapter changed. Separate user edits that already existed from migration edits.
- Run the target's `tsc --noEmit --project src/watchfaces/<watchface>/jsconfig.json --pretty false --skipLibCheck false` and `git diff --check`. If shared type configuration changes, check a configured watchface for each affected API. Build from the target watchface directory after runtime import or manifest changes. A build cannot verify appearance or device-specific event behavior.
- Report what was verified and what still needs a device or simulator: normal mode, AOD, edit mode, minute and day rollover, sensor updates, localization, and restored storage. Do not claim that documentation or type declarations prove behavior on an older firmware where the user has observed something different.
