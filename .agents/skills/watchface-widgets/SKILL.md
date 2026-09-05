---
name: watchface-widgets
description: Create and split Zepp OS watchfaces in amazfit-watchfaces into widget classes, layout files, and shared constants. Use when building a new watchface, adding a standalone component, or extracting date, time, steps, sleep, and other components from index.js. Does not require an architectural refactor for an isolated text, color, or image change.
---

# Watchface Widget Structure

Apply these conventions within `src/watchfaces/<watchface>/`. They describe this repository's code organization, not Zepp OS API requirements. Explicit user instructions take precedence.

## Before making changes

Read the current `watchface/index.js`, layout files, `index.const.js`, and classes of the affected watchface. Refactor the current code: the user may have edited it since the previous response.

Reference implementations, with paths relative to the repository root:

- `src/watchfaces/nothing-clock/watchface/`: simple standalone `TimeWidget`, `DateWidget`, `StepsWidget`, `SleepWidget`, and `BatteryWidget` classes, with `_build…` methods in `index.js`.
- `src/watchfaces/modular/watchface/index.js`: sensor creation and reuse, dependency injection, and selected settings.
- `src/watchfaces/modular/watchface/SleepWidget.js`: content updates and event handlers inside the class.
- `src/watchfaces/modular/watchface/slotWidgets/DateSlotWidget.js`: externally supplied slot geometry and theme.
- `src/watchfaces/modular/watchface/sideWidgets/StepSideWidget.js`: a component with a sensor that controls a nested visual widget.

Open only relevant examples. Do not copy settings, slots, or nesting from a complex watchface unless the task needs them.

## Naming and placement

For ordinary components, place these files alongside one another in `watchface/`:

```text
index.js
index.r.layout.js
index.const.js
TimeWidget.js
TimeWidget.layout.js
DateWidget.js
DateWidget.layout.js
StepsWidget.js
StepsWidget.layout.js
SleepWidget.js
SleepWidget.layout.js
BatteryWidget.js
BatteryWidget.layout.js
```

- `<Name>Widget.js`: a named export, `export class <Name>Widget`. Use PascalCase and a meaningful component name; several `hmUI` primitives can form one class.
- `<Name>Widget.layout.js`: this component's UI properties, with named exports in `UPPER_SNAKE_CASE`, usually ending in `_PROPS`.
- `index.const.js`: shared watchface values and resources, such as `FONT`, `FONT_SIZE`, `TEXT_COLOR`, `COLOR_ACCENT`, palettes, and image path arrays such as `LEVEL_IMAGES`. Move these declarations here instead of duplicating them across layout files. These constants belong to the individual watchface, not the entire repository.
- `index.r.layout.js`: background properties and genuinely shared presentation properties used by the index. Remove a component's properties from this file after extracting it. Preserve an existing `index.layout.js` or `.r.layout.js` variants when the target watchface already uses a different device layout selection scheme.
- `slotWidgets/`, `sideWidgets/`, `settings/`: use these for actual families of components and settings, as in `modular`. A few ordinary components only need adjacent files.
- Images and fonts stay in their existing `assets/default.r`, `assets/common.r`, or device directories; translations stay in `page/i18n/*.po`. Moving JavaScript does not require moving or deleting assets.
- Reuse shared data adapters and formatting helpers from `src/adapters` and `src/utils`, checking relative imports after moving files.

## Responsibilities of index.js

`WatchFace({...})` remains the watchface's composition entry point:

1. `build()` calls separate methods such as `_buildTime()`, `_buildDate()`, and `_buildSteps()`. Do not replace these with direct `new Widget()` calls inside `build()`.
2. Each `_build…()` resolves the component's settings, creates the necessary sensors, and passes them to the class instance. Keep references such as `this._dateWidget` when consistent with surrounding code or needed for later interaction.
3. Create sensors here and reuse them across consumers through fields such as `this._timeSensor` and `this._stepSensor`. Widget classes do not call `hmSensor.createSensor()`.
4. Text formatting, dynamic geometry calculations, and component-specific subscriptions belong in the class, not the index.
5. Preserve component creation order because it affects overlapping elements. For example, hands may be created last to appear above data.

Example method inside `WatchFace`:

```js
_buildDate() {
  this._timeSensor =
    this._timeSensor || hmSensor.createSensor(hmSensor.id.TIME);

  this._dateWidget = new DateWidget({
    timeSensor: this._timeSensor,
  });
},
```

Use `_build…` for new structure. Do not rename unrelated methods in existing code solely for consistency.

## What to pass into a class

The constructor accepts an object containing its required dependencies: `constructor({ timeSensor })`. Use `constructor()` when no parameters are needed.

Pass in:

- instances of the required sensors;
- the selected setting, mode, or theme when the watchface owns that choice;
- `x`, `y`, `w`, `h`, `side`, or a slot number when one class is used in multiple locations;
- a value or callback when it represents a real interface between components, such as `setLevel(ratio)` on a visual progress widget.

Keep internal:

- creation of `hmUI` primitives and references to them;
- fixed component coordinates and image paths in the layout, with shared values in `index.const.js`;
- formatting, `gettext`, and positioning calculations based on current data;
- event handlers, UI updates, and internal state.

Do not pass the entire `WatchFace`, a container of all sensors, or bundles of layout constants merely to move code. Do not parameterize fixed values without a use case for varying them.

A widget that obtains data directly through `hmUI.data_type`, such as battery `TEXT_FONT` and `IMG_LEVEL` widgets, or built-in time rendering through `TIME_POINTER`, may need no JavaScript sensor at all. Do not create one for consistency. Nested visual widgets can receive computed values from their parent component.

## Classes, layouts, and updates

- A static component can create all its UI directly in the constructor. Use `_buildLayout()` for more complex construction; normal mode and AOD can be separated into `_buildNormal()` and `_buildAod()` within one class.
- A dynamic component stores injected dependencies in `this._…`, creates its UI, binds `this._update = this._update.bind(this)` once, and calls `_bindHandlers()`.
- `_update()` reads the sensor, formats data, and calls `setProperty`. Use the same bound function for subscription and unsubscription.
- In `_bindHandlers()`, preserve the existing `WIDGET_DELEGATE`: subscribe and perform the initial update in `resume_call`, and unsubscribe in `pause_call`. Preserve `hmSetting.getScreenType()` conditions, event choices, and update frequency. If there is no subscription, as with sleep updating only on resume, do not add one without a reason.
- Preserve existing timer and handler cleanup and its lifecycle invocation where needed. Do not add empty cleanup methods to static components.
- Layout files export properties without creating UI, sensors, or subscriptions. Use `px()` and existing `show_level` values, including the repository's `ONAL_AOD` spelling.
- For dynamic overrides, create an object with `{ ...PROPS, ...overrides }`; do not mutate an imported object shared by all instances.
- Dependency direction is `index.js → Widget.js → Widget.layout.js → index.const.js`. Classes may import shared constants directly; `index.const.js` does not import classes or layouts.
- Document constructor parameters with JSDoc in the style of adjacent classes, including `HmSensorInstance`.

## Completing and validating a refactor

Preserve behavior during extraction: coordinates, colors, paths, translations, zero padding, missing-data fallbacks, normal mode/AOD, update frequency, and layer order. Do not add a settings editor or new functionality as part of the move.

Remove the previous implementations, unused imports, and duplicate constants after extraction. Check that sensors are created only in `index.js` and that each extracted component is instantiated through its own `_build…()` method.

Check changed JavaScript syntax and run `git diff --check`. For a new watchface or a module extraction, run `zeus build` from `src/watchfaces/<watchface>/` if the builder is available. The root `npm run build` script also packages release files; that is unnecessary for checking a refactor. A successful build does not replace device testing; state separately if rendering, AOD, and resume behavior were not tested. Do not add tests that merely repeat the class structure.
