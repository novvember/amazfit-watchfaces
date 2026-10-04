---
name: watchface-widgets
description: Create or reorganize Zepp OS watchface widgets in amazfit-watchfaces. Use when building a watchface, adding a meaningful standalone component, or extracting substantial behavior from index.js. Do not use to force an architectural refactor for a small edit.
---

# Watchface Widget Structure

Apply these conventions within `src/watchfaces/<watchface>/`. They describe this repository's code organization, not Zepp OS API requirements. Explicit user instructions take precedence.

## Before making changes

Read the current `watchface/index.js`, relevant layouts, constants if present, and classes of the affected watchface. Refactor the current code: the user may have edited it since the previous response.

The following are API 1 examples of local structure, not API 2 API references. Open only examples relevant to the task, and check the target watchface's manifest before reusing runtime calls:

- `src/watchfaces/nothing-clock/watchface/`: simple standalone `TimeWidget`, `DateWidget`, `StepsWidget`, `SleepWidget`, and `BatteryWidget` classes, with `_build…` methods in `index.js`.
- `src/watchfaces/modular/watchface/index.js`: sensor creation and reuse, dependency injection, and selected settings.
- `src/watchfaces/modular/watchface/SleepWidget.js`: content updates and event handlers inside the class.
- `src/watchfaces/modular/watchface/slotWidgets/DateSlotWidget.js`: externally supplied slot geometry and theme.
- `src/watchfaces/modular/watchface/sideWidgets/StepSideWidget.js`: a component with a sensor that controls a nested visual widget.

Do not copy settings, slots, or nesting from a complex watchface unless the task needs them. Existing repository code may contain mistakes; use the selected Zepp API documentation for runtime behavior.

## Naming and placement

For components with their own substantial construction or update behavior, place their code and layout alongside one another in `watchface/`. For example:

```text
index.js
index.r.layout.js
TimeWidget.js
TimeWidget.layout.js
```

- `<Name>Widget.js`: a named export, `export class <Name>Widget`. Use PascalCase and a meaningful component name; several UI primitives can form one class.
- `<Name>Widget.layout.js`: this component's UI properties, with named exports in `UPPER_SNAKE_CASE`, usually ending in `_PROPS`.
- `index.const.js`: optional home for values genuinely shared across multiple files, such as a palette or image path array. Keep a constant near its only use; do not create a separate file solely to move a few literals.
- `index.r.layout.js`: background properties and genuinely shared presentation properties used by the index. Remove a component's properties from this file after extracting it. Preserve an existing `index.layout.js` or `.r.layout.js` variants when the target watchface already uses a different device layout selection scheme.
- `slotWidgets/`, `sideWidgets/`, `settings/`: use these for actual families of components and settings, as in `modular`. A few ordinary components only need adjacent files.
- Images and fonts stay in their existing `assets/default.r`, `assets/common.r`, or device directories; translations stay in `page/i18n/*.po`. Moving JavaScript does not require moving or deleting assets.
- Use API 1 sensor adapters from `src/adapters/`, API 2 sensor adapters from `src/adapters2/`, and helpers from `src/utils/` only when they do not depend on the other API. Check the adapter's sensor contract and relative import path before using it.

## Responsibilities of index.js

`WatchFace({...})` remains the watchface's composition entry point:

1. `build()` calls named `_build…()` helpers when they make the composition easier to read. Keep Zepp lifecycle method names (`onInit`, `build`, `onDestroy`) unchanged.
2. Create a widget class only when it owns meaningful state, UI construction, or update behavior. A one-line wrapper around `createWidget` is not a useful component.
3. Keep sensor creation and shared dependencies in the entry point when that matches the target structure; pass sensors to components that need them. For API 1 use `hmSensor`, for API 2 use the relevant `@zos/sensor` class.
4. Place formatting, geometry, and subscriptions near the behavior they serve. For a small watchface, a focused `_build…()` in the entry point can remain clearer than multiple nearly empty files.
5. Preserve component creation order because it affects overlapping elements. For example, hands may be created last to appear above data.

API 1 example method inside `WatchFace`:

```js
_buildDate() {
  this._timeSensor =
    this._timeSensor || hmSensor.createSensor(hmSensor.id.TIME);

  this._dateWidget = new DateWidget({
    timeSensor: this._timeSensor,
  });
},
```

Use `_build…` for internal helpers in new structure. Preserve existing names and algorithms unless the requested change needs them; do not rename unrelated methods solely for consistency.

## What to pass into a class

The constructor accepts an object containing its required dependencies: `constructor({ timeSensor })`. Use `constructor()` when no parameters are needed.

Pass in:

- instances of the required sensors (using the target's API level);
- the selected setting, mode, or theme when the watchface owns that choice;
- `x`, `y`, `w`, `h`, `side`, or a slot number when one class is used in multiple locations;
- a value or callback when it represents a real interface between components, such as `setLevel(ratio)` on a visual progress widget.

Keep internal:

- creation of UI primitives and references to them (`hmUI` in API 1, `@zos/ui` in API 2);
- fixed component coordinates and image paths in the layout, with genuinely shared values in `index.const.js` if that file is useful;
- formatting, localization, and positioning calculations based on current data, using the target API;
- event handlers, UI updates, and internal state.

Do not pass the entire `WatchFace`, a container of all sensors, or bundles of layout constants merely to move code. Do not parameterize fixed values without a use case for varying them.

In API 1, a widget that obtains data directly through `hmUI.data_type`, such as battery `TEXT_FONT` and `IMG_LEVEL` widgets, or built-in time rendering through `TIME_POINTER`, may need no JavaScript sensor at all. Do not create one for consistency. Verify equivalent capabilities separately for API 2. Nested visual widgets can receive computed values from their parent component.

## Classes, layouts, and updates

- A static component can create all its UI directly in the constructor. Use `_buildLayout()` for more complex construction; normal mode and AOD can be separated into `_buildNormal()` and `_buildAod()` within one class.
- A dynamic component may store injected dependencies in `this._…`, create its UI, and bind a handler once when the event API needs a stable reference. Keep the original component structure when it is already clear.
- `_update()` or a local update function reads the sensor, formats data, and updates UI. Where an event API provides both `on…` and `off…`, pass the same callback to each.
- Use `WIDGET_DELEGATE` to refresh on `resume_call` and manage subscriptions that should run only while the watchface is active. Pair `onChange`/`offChange` in `resume_call`/`pause_call` for API 2 `Step` and `Battery` when those updates are only needed on the visible face. `Time.onPerMinute` has no documented `offPerMinute`; register it once per build and filter updates by scene when necessary. Do not register it again on every resume. Inspect each sensor's own contract; there is no universal subscribe/unsubscribe rule for all sensors.
- Preserve existing timer and handler cleanup and its lifecycle invocation where needed. Do not add empty cleanup methods to static components.
- Layout files export properties without creating UI, sensors, or subscriptions. Import `px` and UI constants from the selected API's normal module. Preserve existing `show_level` behavior, including the SDK's `ONAL_AOD` spelling; do not add a runtime re-export file for standard functions.
- For dynamic overrides, create an object with `{ ...PROPS, ...overrides }`; do not mutate an imported object shared by all instances.
- Keep dependencies easy to follow; if `index.const.js` exists, it should not import classes or layouts.
- Document constructor parameters with the selected API's sensor type when inference cannot establish the contract; `HmSensorInstance` belongs to API 1.

## Completing and validating a refactor

Preserve behavior during extraction: coordinates, colors, paths, translations, zero padding, missing-data fallbacks, normal mode/AOD, update frequency, and layer order. Do not add a settings editor or new functionality as part of the move.

Remove previous implementations, unused imports, and duplicate constants after extraction. Review the diff against the original for accidental changes in algorithms, fallback values, storage keys, array creation, and rendering order.

Check changed JavaScript syntax and run `git diff --check`. For a new watchface or a module extraction, run `zeus build` from `src/watchfaces/<watchface>/` if the builder is available. The root `npm run build` script also packages release files; that is unnecessary for checking a refactor. A successful build does not replace device testing; state separately if rendering, AOD, and resume behavior were not tested. Do not add tests that merely repeat the class structure.
