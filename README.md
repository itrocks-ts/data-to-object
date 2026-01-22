[![npm version](https://img.shields.io/npm/v/@itrocks/data-to-object?logo=npm)](https://www.npmjs.org/package/@itrocks/data-to-object)
[![npm downloads](https://img.shields.io/npm/dm/@itrocks/data-to-object)](https://www.npmjs.org/package/@itrocks/data-to-object)
[![GitHub](https://img.shields.io/github/last-commit/itrocks-ts/data-to-object?color=2dba4e&label=commit&logo=github)](https://github.com/itrocks-ts/data-to-object)
[![issues](https://img.shields.io/github/issues/itrocks-ts/data-to-object)](https://github.com/itrocks-ts/data-to-object/issues)
[![discord](https://img.shields.io/discord/1314141024020467782?color=7289da&label=discord&logo=discord&logoColor=white)](https://25.re/ditr)

# data-to-object

Transforms raw input data into a business object with type-safe values.

## Installation

```bash
npm i @itrocks/data-to-object
```

## Usage

```ts
import { dataToObject } from '@itrocks/data-to-object'

class User {
  name!: string
  age!: number
}

const rawData = {
  name: 'John Doe',
  age: '30'
}

const user = new User()
await dataToObject(user, rawData)

console.log(user)
// { name: 'John Doe', age: 30 }
```

## dataToObject()

```ts
dataToObject<T extends object>(object: T, data: RecursiveValueObject): Promise<T>
```

Converts raw data (JSON payloads, form inputs, query params…) into a business object
by applying type-aware transformations on each input key that resolves to a property
declared on the target object.

### Parameters

- `object`: Target business object to populate.
- `data`: Raw input data. Values may be strings or already-typed values.\
  *([RecursiveValueObject](https://github.com/itrocks-ts/request-response#recursivevalueobject))*

### Behaviour

- Only properties **declared on the target object** are assigned.
- Input keys are normalised from form field to property names using `@itrocks/rename` (`toProperty`).
- Fields ending with `_id` fall back to their base field name (e.g. `user_id` → `user`)
  only when the `_id` property does not exist on the target object,
  and only if the base field name is not already present in the input data.
- Each value is transformed using its matching transformer
  ([@itrocks/transformer](https://github.com/itrocks-ts/transformer))
  with the `HTML` and `INPUT` contexts.
- The transformer may return a value to be assigned,
  or mutate the target object directly
  and return [IGNORE](https://github.com/itrocks-ts/transformer#ignoring-a-transformation-result)
  to prevent any automatic assignment.

### Typical use cases

- Processing web form submissions safely.
- Mapping request payloads to domain objects.
- Centralising input sanitisation and type coercion.

This function is commonly used by higher-level helpers such as [@itrocks/save](https://github.com/itrocks-ts/save).
