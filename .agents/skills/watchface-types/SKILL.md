---
name: watchface-types
description: Write, modify, or review JSDoc types in amazfit-watchfaces JavaScript and shared Zepp OS declarations. Use when changing watchface code, adapters, layouts, settings, or type configurations, and when investigating type errors.
---

# Watchface Types

All new or changed code in this repository must be type-correct. Type checking is a completion requirement, including for small watchface changes. Keep JavaScript with JSDoc; do not migrate files to TypeScript unless requested. Existing examples are useful conventions, not evidence that their typing is correct.

## Read the actual contracts

Paths below are relative to the repository root.

- Read the watchface's `app.json` API level and its nearest `jsconfig.json`. A watchface using API 1 extends `jsconfig.api1.json`; a watchface using API 2 extends `jsconfig.api2.json`. Both inherit compiler settings from `jsconfig.base.json`. The manifest controls the watch runtime; `extends` controls editor and compiler types. TypeScript does not select types from `app.json` automatically.
- Only watchfaces with a local `jsconfig.json` are isolated. If the affected watchface lacks one, add a small local config extending the matching API config and including its JavaScript while excluding `dist`. The root `jsconfig.json` checks shared adapters and utilities with API 1 types; it does not include watchfaces.
- For API 1, use ambient declarations from `src/types/api_level_1/`, including `HmSensorInstance`, `HmWidgetInstance`, `HmWidgetProps`, `hmUI`, and `hmSensor`. For API 2, use `@zeppos/device-types` plus verified additions in `src/types/api_level_2/`. Each API config includes its own `WatchFace` and `console` declarations. Keep these declarations separate in `src/types/api_level_1/` and `src/types/api_level_2/`, even when their contents match; the API 2 config must not reference API 1 files. Do not pull API 1 globals into an API 2 project to quiet type errors.
- Check affected adapters in `src/adapters/` for API 1 or `src/adapters2/` for API 2, plus helpers in `src/utils/`, callers, layouts, and settings before choosing a type. A pure utility may be shared across API levels; an adapter that accepts an API 1 sensor must not be imported into an API 2 project.
- Useful patterns: `modular/watchface/SleepWidget.js` has a named constructor-parameter typedef; `nothing-clock/watchface/TimeWidget.js` derives a color key from a constant. These paths are under `src/watchfaces/`. Check whether a return type is actually needed instead of copying annotations or omissions from older code; do not copy broad `Object` types or suppressions.

## Explicit JSDoc contracts

- Describe parameters and non-obvious return values with JSDoc where inference does not express the contract, especially at module boundaries, for exported helpers, and for structured data. Do not add `/** @returns {void} */` to lifecycle methods, `_build…()` methods, UI updates, or callbacks that plainly return nothing. Keep `@returns {void}` only if it resolves a real type ambiguity. Contextually typed callbacks usually need no repeated annotation.
- A JavaScript class already declares its instance type. Document constructor parameters and methods when their contracts are not clear from the code; let field types be inferred from typed initializers when inference captures the intended type. Do not add a meaningless `@type {Object}` to the class. Constructors do not need `@returns`.
- Use a local `@typedef` with `@property` entries for reusable constructor options, settings results, geometry, and structured return values. Reuse module-local types across files through JSDoc `import('./relative/module').TypeName`; this is not a runtime import. Do not put watchface-specific models into global Zepp declarations.
- Use primitive `string`, `number`, and `boolean`. Avoid broad `Object`, `Function`, untyped arrays, and `Record<string, any>`. Write exact fields, callback signatures, element types, and tuple shapes.
- Prefer inference for constants, local variables, class state, and widget/sensor references when a typed initializer already supplies the complete intended type. Do not add redundant `@type` comments merely because a value is a class field: `this._group = hmUI.createWidget(...)` already infers `HmWidgetInstance`, and assigning a typed constructor parameter preserves its type.
- Add explicit annotations when inference is insufficient, such as empty collections without a contextual element type, optional or deferred fields, or a field that needs a wider union than its initializer. Check configuration objects where the installed API types permit it without obscuring the layout.
- Represent deferred initialization honestly, for example `HmWidgetInstance | undefined`, initialize it, and narrow before use. Prefer creating required fields in the constructor when appropriate. Do not hide initialization problems with casts or add optional chaining that silently skips required work.

Example inside a watchface module:

```js
/**
 * @typedef {object} CounterWidgetParams
 * @property {HmSensorInstance} stepSensor
 */

export class CounterWidget {
  /** @param {CounterWidgetParams} params */
  constructor({ stepSensor }) {
    this._stepSensor = stepSensor;
    this._textWidget = hmUI.createWidget(hmUI.widget.TEXT, {
      x: px(20), y: px(20), w: px(160), h: px(40), text: '',
    });
  }

  _update() {
    const current = this._stepSensor.current ?? 0;
    this._textWidget.setProperty(hmUI.prop.TEXT, String(current));
  }
}
```

## Layouts, settings, and state

- Prefer a simple `@satisfies` on exported layout objects when the installed API type covers their properties and the annotation catches real mistakes. Some API 2 widget option types omit `show_level`; do not add an intersection such as `& { show_level: number }` merely to force a check. When an annotation becomes harder to understand than the object, rely on the checked `createWidget` call and inspect the layout properties directly.
- Reuse a narrower type from the selected API if available. For a deliberate subset use `Pick`/`Omit` based on that type, not a copied interface. Never add an unrestricted index signature to make an unsupported widget property pass.
- Derive closed keys with `keyof typeof CONSTANT`, such as `keyof typeof import('./index.const').COLOR_ACCENT`. Preserve finite palette keys; annotating a palette as `Record<string, ColorTheme>` loses them. A checked object with `@satisfies` can validate values while keeping keys.
- Give settings option payloads and returned selections explicit types. In API 1, an edit-option shape can derive from `NonNullable<HmWidgetProps['optional_types']>[number]`; in API 2, derive it from the matching `@zos/ui` contract.
- Preserve literal unions for modes and sides, such as `'default' | 'seconds'` and `'left' | 'right'`. Iterate a typed list of known sides; `for…in` produces arbitrary strings. Do not cast arbitrary strings to a union.
- `Object.fromEntries` does not establish an exact settings shape. For a fixed shape, return an explicitly typed object with validated choices and a valid default when selection lookup fails.
- For new `WatchFace({...})` state that cannot be checked by inference, use a focused `@this` or descriptor if it materially catches errors. The current ambient `WatchFace` has a permissive `Record<string, any>` in `ThisType`; a passing compiler check alone does not validate state or method arguments. Strong `ThisType` checking also requires `noImplicitThis`; do not claim the current configuration enforces it.

## Optional values and data boundaries

- In API 1, `HmSensorInstance` combines sensors with many optional properties and methods. Narrow missing values and methods or use the appropriate API 1 adapter. In API 2, use sensor classes and methods declared by `@zos/sensor`; place API 2 sensor adapters in `src/adapters2/`. Preserve intentional fallbacks and use the same handler reference when a matching unsubscribe method exists. Do not invent an unsubscribe method for an event that lacks one.
- Treat values from `JSON.parse` as `unknown` until runtime validation establishes their shape. Check arrays, element types, and allowed IDs; handle malformed JSON and invalid stored data with the intended fallback. A cast to `string[]` does not validate storage.
- For dictionary access, use validated `keyof` keys or an honest open dictionary such as `Record<string, number | undefined>` with a fallback. Do not widen a closed map merely to silence indexing errors.
- Match tuple arity on every return path. A function that throws an `Error` does not return `Error`; use its actual success type and optionally `@throws`. Use `Float32Array` for a typed array, not `number[]`.
- Model success/error results with a discriminated union when callers must narrow related values. Use an exact data object, not `Object`.

## Repair declarations rather than bypass checks

Do not introduce `any`, `@ts-ignore`, `@ts-nocheck`, unsafe assertions, or compiler relaxations to get a clean result. Remove existing suppressions in code being fixed by resolving their causes. For duplicate properties followed by spreads, keep each property in the intended final position instead of suppressing duplicate-key diagnostics.

Shared declarations can themselves be wrong or incomplete. Check the runtime contract before repairing them; distinguish a declaration defect from incorrect application code. A missing declaration is not proof that a runtime feature exists. If evidence is missing, report the uncertainty instead of inventing API details.

For a verified API 2 declaration gap that affects type correctness, add a narrow module augmentation in `src/types/api_level_2/` and include it only through `jsconfig.api2.json`. First verify the symbol is absent from the installed package; do not duplicate an existing definition. Keep watchface source readable: use `ui.show_level`, `ui.system_status`, and `ui.widget` directly. Do not add `unknown` casts, duplicate local UI objects, or runtime wrapper/re-export files just to bypass incomplete SDK types. Confirm the augmentation against the runtime API and compile the affected API project; check the API 1 project too if shared configuration changed.

Repository pitfalls to recognize:

- An imported ambient module needs a string name, e.g. `declare module 'i18n'`, not `declare module i18n`.
- A namespace is not an instance type. Refer to value types with `typeof hmUI.createWidget` or `(typeof hmUI.prop)[keyof typeof hmUI.prop]`. The latter describes constant **values**; `keyof typeof hmUI.prop` describes their string **names**. Apply the same distinction to sensor events and alignment constants.
- Remove duplicate declaration members. For more precise per-widget/per-property typing, use verified literal constants and maps or overloads; if every constant is only `number`, they cannot discriminate widget kinds.
- Avoid extending global types with catch-all properties. If a necessary shared declaration is fixed, check all its consumers, not only the current watchface.

## Required verification

Run the available TypeScript compiler from the repository root, without emitting files, for the affected watchface's own project:

```sh
tsc --noEmit --project src/watchfaces/<watchface>/jsconfig.json --pretty false --skipLibCheck false
```

When changing shared type configuration, check one configured watchface from each affected API level. For an API-specific declaration, verify that a symbol from the other API is rejected in that project's compiler context when isolation is at issue. Run the root `jsconfig.json` check separately for API 1 adapters and shared utilities; it does not validate watchfaces or `src/adapters2/` by itself.

Use the installed compiler's executable path if `tsc` is not on PATH. Record its version. If unavailable, arrange a temporary compiler installation without silently changing repository dependencies, or state that compiler validation is blocked. Do not substitute syntax checking or a successful Zeus build for type checking.

- Explicit `--skipLibCheck false` includes the shared `.d.ts` themselves in validation; JavaScript project defaults can otherwise hide their errors.
- Capture a baseline before code changes. Re-run after changes and require zero type errors in the task's code and relevant dependencies, with no new diagnostics elsewhere. When changing global declarations, inspect the full diagnostic impact.
- Pre-existing unrelated errors do not authorize a repository-wide refactor. Report their counts and scope separately. If relevant errors remain, state that the type-correctness requirement is not yet met; never label a failing check as successful.
- Inspect affected code for suppressions and broad or implicit types even after a clean compiler run: `any`, unchecked storage data, and permissive API declarations can hide defects. Keep checks proportionate to the actual change.
- Run `git diff --check`. Report the command, compiler version, outcome, and any remaining limitations. For a review-only request, propose fixes without changing watchface behavior or shared declarations unless requested.
