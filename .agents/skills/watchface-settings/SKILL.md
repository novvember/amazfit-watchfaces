---
name: watchface-settings
description: Create or modify on-watch Zepp OS watchface settings in amazfit-watchfaces and pass selected values into widget classes. Use for edit groups, selectable colors or modes, configurable slots, settings backgrounds and metadata, and connecting existing settings to rendering.
---

# Watchface Settings

Apply these repository conventions within `src/watchfaces/<watchface>/`. These settings use the on-watch editor, not a phone settings page.

## Inspect the current implementation

Read the target watchface's `index.js`, relevant settings classes and layouts, shared constants, affected widgets, translations, and `app.json`. Inspect actual files again before editing: the user may have changed IDs, coordinates, assets, or palette values since the previous turn.

Use only relevant reference implementations, with paths relative to the repository root:

- `src/watchfaces/nothing-clock/watchface/settings/`: a single accent setting, separate layouts, an edit background with an overlay, and an information widget.
- `src/watchfaces/nothing-clock/watchface/{index.js,DateWidget.js,TimeWidget.js}`: passing a color key to consumers, resolving palette values, and selecting matching hand images.
- `src/watchfaces/modular/watchface/settings/ColorSettings.js` and `TimeSettings.js`: named settings exposed through `.settings`.
- `src/watchfaces/modular/watchface/settings/SideSettings.js`: multiple named edit groups with per-side geometry and images.
- `src/watchfaces/modular/watchface/settings/WidgetSettings.js`: numbered slots, per-slot defaults, and package information.
- `src/watchfaces/modular/watchface/index.js`: resolving settings before constructing widgets and choosing implementations for configurable slots.

Copy the relevant mechanism, not unrelated complexity. In particular, modular's `ColorSettings.const.js` calls its options `SETTINGS_TIME_OPTIONAL_TYPES`; use a name matching the new setting instead of carrying over that historical mismatch.

## Files and responsibilities

Place settings families in `watchface/settings/`:

- `<Name>Settings.js`: named class export, edit-group creation, and selected-value lookup.
- `<Name>Settings.const.js`: option IDs, localized labels, preview paths, and semantic option data.
- `<Name>Settings.layout.js`: coordinates, sizes, selection images, tips, backgrounds, and overlays.
- `InfoWidget.js` and `InfoWidget.layout.js`: package information when requested.

Keep shared palettes and resource definitions in the watchface's `index.const.js`. Keep images in the existing asset directory, typically under `edit/`, and translations in `page/i18n/*.po`. Preserve the target's device-specific asset and layout scheme.

For a single setting, create one edit group directly. For repeated sides or slots, use a group descriptor array and expose results under meaningful keys such as `left`, `right`, or slot numbers, following modular. Do not introduce repeated-group machinery merely for one option selector.

## Option identity and persistence

Use `hmUI.widget.WATCHFACE_EDIT_GROUP` as in the repository:

1. Define each option with a numeric `type`, localized `title_en`, `title_tc`, and `title_sc`, a valid `preview` path, and semantic data such as `data: { type: 'red' }`.
2. Assign an `edit_id` that does not collide with another group in the target watchface. Inspect existing IDs before choosing it; IDs from modular are examples, not global allocations.
3. Supply `optional_types`, `count: optionalTypes.length`, and a `default_type` that belongs to the options. Preserve existing defaults unless the task changes them.
4. Read `hmUI.prop.CURRENT_TYPE` from the created group and resolve it by matching the option's `type`, not by treating the returned value as an array index.
5. Expose semantic values through `.settings`, for example `{ accent: 'red' }`. Resolve an unknown selection to an explicit valid fallback before rendering.

Treat existing group IDs and option type IDs as persisted identities: keep their meanings stable when adding, reordering, or relabeling options. Do not renumber them just to make a sequence tidy. Check per-group defaults when changing repeated groups.

Use the built-in selection mechanism; no separate storage layer is needed for this pattern. Check `targets.*.module.watchface.editable` in `app.json` when introducing the first editor. Preserve unrelated manifest fields.

Use `gettext` and update all existing locales. Match the project's current translation key convention. All three title fields may use the same translated string, as in these examples.

## Pass settings into consumers

The watchface entry point owns composition:

- Create settings before any consumer needs them, through `_buildSettings()` or the target's existing build methods.
- Resolve a semantic selection and fallback in the entry point or settings class, then pass only the needed value through the consumer's constructor.
- Do not pass the entire settings object, watchface instance, or edit-group widget into a rendering widget.
- Let the consumer translate the selected key into the palette value, image path, or rendering mode it needs. Document the constructor parameter, using `keyof typeof COLOR_ACCENT` or an equivalent type where useful.

For example, `index.js` passes `colorAccent: this._colorAccent` to `DateWidget` and `TimeWidget`. The date rectangle uses `COLOR_ACCENT[colorAccent]`; the time widget uses matching `time/second_<color>.png` and `time/second_top_<color>.png` assets. Use the actual target palette and filenames, not guessed colors or paths.

Override layout properties with a fresh object:

```js
hmUI.createWidget(hmUI.widget.TIME_POINTER, {
  ...TIME_POINTERS_PROPS,
  second_path: `time/second_${this._colorAccent}.png`,
  second_cover_path: `time/second_top_${this._colorAccent}.png`,
});
```

Keep dynamically supplied properties visible in the layout. For image paths retain placeholders such as `second_path: ''` and `second_cover_path: ''`; for numeric properties such as `color`, retain an appropriate numeric default. Do not delete properties merely because the widget overrides them, and do not mutate imported layout objects.

Connect only the requested consumers. Creating an editor does not imply applying its values everywhere. Preserve normal-mode and AOD behavior independently; a normal-mode second-hand setting does not require adding a second hand to AOD.

## Background, overlay, and package information

When an edit background is requested, create it before the selectors and information text so it stays underneath them. In `nothing-clock`, `ColorSettings` calls `buildBackground()` before `_buildEditWidgets()`; keep an existing method spelling when editing other watchfaces.

- Create an `IMG` using the existing edit background asset.
- Create the dimming overlay after the image. Existing repository examples use a black `CIRCLE` with `alpha: 90`; use geometry matching the target screen and current layout rather than treating a copied radius as universal.
- Give both layers `hmUI.show_level.ONLY_EDIT`. Keep their properties in the settings layout.
- Create shared edit backgrounds once; additional settings classes should not cover earlier selectors with another full-screen background.

For package information, use `hmApp.getPackageInfo()` and its `name`, `version`, and `vender` fields. Modular joins the name, `v. ${version}`, and `github: @${vender}` with ` / `, omitting missing fields. Follow the requested author format; use the GitHub label only when appropriate for the target. Render the information with `ONLY_EDIT`, using layout properties, rather than hardcoding a version that will become stale.

## Assets and scope

Inspect existing files before adding preview or selection images. If the user reserves layout and previews for later, preserve that scope: keep coordinates easy to change, reuse suitable existing assets as clearly identified temporary previews, and do not create a finished visual design. Any copied selection frames must fit the intended group geometry. Explain which assets were reused or copied; do not imply they were newly generated.

When applying a color to multiple related images, verify every supported option has all required assets, including covers. A successful JavaScript build alone does not prove dynamic paths resolve.

## Validation

Check changed JavaScript syntax and run `git diff --check`. Verify option IDs, defaults, translation coverage, referenced assets, selected-value flow, and edit-layer ordering. For a new settings feature or a structural integration, run `zeus build` from `src/watchfaces/<watchface>/` if available; the repository root is not a Zeus project, and root `npm run build` also packages releases.

Use focused checks for small wiring or layout changes rather than adding tests that mirror object structure. State separately whether device or simulator behavior was verified. When runtime testing is available, check selection persistence after reopening, requested rendering changes, edit-only visibility, and preserved AOD behavior.
