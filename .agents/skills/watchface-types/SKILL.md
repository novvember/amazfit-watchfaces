---
name: watchface-types
description: Write, modify, or review JSDoc types in amazfit-watchfaces JavaScript and shared Zepp OS declarations. Use when changing watchface functions, classes, state, layouts, settings, adapters, or utilities, and when investigating type errors. Requires explicit contracts, reuse of global types, and compiler verification.
---

# Watchface Types

All new or changed code in this repository must be type-correct. Type checking is a completion requirement, including for small watchface changes. Keep JavaScript with JSDoc; do not migrate files to TypeScript unless requested. Existing examples are useful conventions, not evidence that their typing is correct.

## Read the actual contracts

Paths below are relative to the repository root.

- Read `jsconfig.json`: it enables `checkJs`, `strictNullChecks`, and `noImplicitAny`, targets ES2020, and includes `src/**/*.js` and `src/**/*.d.ts`. Preserve these checks. The current `typeRoots` points to `./types`; declarations under `src/types` enter through `include`.
- Read the relevant declarations in `src/types/api_level_1/`. `HmSensorInstance`, `HmWidgetInstance`, and `HmWidgetProps`, plus `hmUI`, `hmSensor`, `hmSetting`, `hmFS`, `hmApp`, `WatchFace`, `App`, `timer`, and `px`, are ambient declarations. Use them directly in JSDoc, without runtime imports or duplicate local API interfaces.
- Check the affected adapters in `src/adapters/`, helpers in `src/utils/`, callers, layout files, and settings definitions before choosing a type.
- Useful patterns: `modular/watchface/SleepWidget.js` has a named constructor-parameter typedef; `nothing-clock/watchface/TimeWidget.js` derives a color key from a constant. These paths are under `src/watchfaces/`. Do not copy missing return annotations, broad `Object` types, or suppressions from older code.

## Explicit JSDoc contracts

- Annotate every new or modified function and method: named `@param` entries for all parameters and `@returns` for its actual result, including `@returns {void}`. Include private helpers, lifecycle methods, and callbacks. A callback may use an explicit function `@type` or a checked contextual contract instead of repeating parameter annotations.
- A JavaScript class already declares its instance type. Type its constructor parameters, fields, methods, and public interface; do not add a meaningless `@type {Object}` to the class. Constructors do not need `@returns`.
- Use a local `@typedef` with `@property` entries for reusable constructor options, settings results, geometry, and structured return values. Reuse module-local types across files through JSDoc `import('./relative/module').TypeName`; this is not a runtime import. Do not put watchface-specific models into global Zepp declarations.
- Use primitive `string`, `number`, and `boolean`. Avoid broad `Object`, `Function`, untyped arrays, and `Record<string, any>`. Write exact fields, callback signatures, element types, and tuple shapes.
- Explicitly type class state, widget/sensor references, empty collections, optional or deferred fields, and exported configuration objects. Simple local literals may use inference when it preserves the complete intended type.
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
    /** @type {HmSensorInstance} */
    this._stepSensor = stepSensor;
    /** @type {HmWidgetInstance} */
    this._textWidget = hmUI.createWidget(hmUI.widget.TEXT, {
      x: px(20), y: px(20), w: px(160), h: px(40), text: '',
    });
  }

  /** @returns {void} */
  _update() {
    const current = this._stepSensor.current ?? 0;
    this._textWidget.setProperty(hmUI.prop.TEXT, String(current));
  }
}
```

## Layouts, settings, and state

- Check exported layout objects at their definition with `@satisfies {HmWidgetProps}` (TypeScript 5+) or `@type {HmWidgetProps}`. Prefer `@satisfies` when consumers need the inferred required fields. A spread into `createWidget` is not enough to catch misspelled properties in the original layout.
- Reuse a narrower global API type if available. For a deliberate subset use `Pick`/`Omit` based on the shared type, not a copied interface. Never add an unrestricted index signature to make an unsupported widget property pass.
- Derive closed keys with `keyof typeof CONSTANT`, such as `keyof typeof import('./index.const').COLOR_ACCENT`. Preserve finite palette keys; annotating a palette as `Record<string, ColorTheme>` loses them. A checked object with `@satisfies` can validate values while keeping keys.
- Give settings option payloads and returned selections explicit types. For example, derive an edit-option shape from `NonNullable<HmWidgetProps['optional_types']>[number]`, replacing its `data` with the specific local payload using `Omit` and an intersection.
- Preserve literal unions for modes and sides, such as `'default' | 'seconds'` and `'left' | 'right'`. Iterate a typed list of known sides; `for…in` produces arbitrary strings. Do not cast arbitrary strings to a union.
- `Object.fromEntries` does not establish an exact settings shape. For a fixed shape, return an explicitly typed object with validated choices and a valid default when selection lookup fails.
- Explicitly model the fields and methods used through `this` in `WatchFace({...})`, including cached sensors and selected settings. Use a typed descriptor and `@this` where necessary. The current ambient `WatchFace` has a permissive `Record<string, any>` in `ThisType`; do not rely on that to validate state or method arguments. Strong `ThisType` checking also requires `noImplicitThis`; do not claim the current configuration enforces it.

## Optional values and data boundaries

- `HmSensorInstance` currently combines sensors with many optional properties and methods. Reuse it, but narrow missing values and methods or use the appropriate existing adapter. Preserve intentional fallbacks and the same handler reference for subscription and unsubscription.
- Treat values from `JSON.parse` as `unknown` until runtime validation establishes their shape. Check arrays, element types, and allowed IDs; handle malformed JSON and invalid stored data with the intended fallback. A cast to `string[]` does not validate storage.
- For dictionary access, use validated `keyof` keys or an honest open dictionary such as `Record<string, number | undefined>` with a fallback. Do not widen a closed map merely to silence indexing errors.
- Match tuple arity on every return path. A function that throws an `Error` does not return `Error`; use its actual success type and optionally `@throws`. Use `Float32Array` for a typed array, not `number[]`.
- Model success/error results with a discriminated union when callers must narrow related values. Use an exact data object, not `Object`.

## Repair declarations rather than bypass checks

Do not introduce `any`, `@ts-ignore`, `@ts-nocheck`, unsafe assertions, or compiler relaxations to get a clean result. Remove existing suppressions in code being fixed by resolving their causes. For duplicate properties followed by spreads, keep each property in the intended final position instead of suppressing duplicate-key diagnostics.

Shared declarations can themselves be wrong or incomplete. Check the runtime contract before repairing them; distinguish a declaration defect from incorrect application code. A missing declaration is not proof that a runtime feature exists. If evidence is missing, report the uncertainty instead of inventing API details.

Repository pitfalls to recognize:

- An imported ambient module needs a string name, e.g. `declare module 'i18n'`, not `declare module i18n`.
- A namespace is not an instance type. Refer to value types with `typeof hmUI.createWidget` or `(typeof hmUI.prop)[keyof typeof hmUI.prop]`. The latter describes constant **values**; `keyof typeof hmUI.prop` describes their string **names**. Apply the same distinction to sensor events and alignment constants.
- Remove duplicate declaration members. For more precise per-widget/per-property typing, use verified literal constants and maps or overloads; if every constant is only `number`, they cannot discriminate widget kinds.
- Avoid extending global types with catch-all properties. If a necessary shared declaration is fixed, check all its consumers, not only the current watchface.

## Required verification

Run the available TypeScript compiler from the repository root, without emitting files:

```sh
tsc --noEmit --project jsconfig.json --pretty false --skipLibCheck false
```

Use the installed compiler's executable path if `tsc` is not on PATH. Record its version. If unavailable, arrange a temporary compiler installation without silently changing repository dependencies, or state that compiler validation is blocked. Do not substitute syntax checking or a successful Zeus build for type checking.

- Explicit `--skipLibCheck false` includes the shared `.d.ts` themselves in validation; JavaScript project defaults can otherwise hide their errors.
- Capture a baseline before code changes. Re-run after changes and require zero type errors in the task's code and relevant dependencies, with no new diagnostics elsewhere. When changing global declarations, inspect the full diagnostic impact.
- Pre-existing unrelated errors do not authorize a repository-wide refactor. Report their counts and scope separately. If relevant errors remain, state that the type-correctness requirement is not yet met; never label a failing check as successful.
- Search affected code for suppressions and broad/implicit types even after a clean compiler run: `any`, unchecked storage data, permissive API declarations, and missing explicit contracts can hide defects.
- Run `git diff --check`. Report the command, compiler version, outcome, and any remaining limitations. For a review-only request, propose fixes without changing watchface behavior or shared declarations unless requested.
