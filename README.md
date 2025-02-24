[![npm version](https://img.shields.io/npm/v/@itrocks/data-to-object?logo=npm)](https://www.npmjs.org/package/@itrocks/data-to-object)
[![npm downloads](https://img.shields.io/npm/dm/@itrocks/data-to-object)](https://www.npmjs.org/package/@itrocks/data-to-object)
[![GitHub](https://img.shields.io/github/last-commit/itrocks-ts/data-to-object?color=2dba4e&label=commit&logo=github)](https://github.com/itrocks-ts/data-to-object)
[![issues](https://img.shields.io/github/issues/itrocks-ts/data-to-object)](https://github.com/itrocks-ts/data-to-object/issues)
[![discord](https://img.shields.io/discord/1314141024020467782?color=7289da&label=discord&logo=discord&logoColor=white)](https://25.re/ditr)

# data-to-object

Transforms raw string-based data into a business object with type-safe values.

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
// Output: { name: 'John Doe', age: 30 }
```

## dataToObject Function

Converts raw data (e.g., JSON, web forms) into a business object
by applying type-appropriate transformations to each property.

### Parameters

- `object` (*T extends object*) – The target object where the transformed values will be assigned.
- `data` (*[RecursiveStringObject](https://github.com/itrocks-ts/request-response#recursivestringobject)*) – The raw data source with string values.

### Behavior

- Inspect the object's properties.
- Applies transformations via [@itrocks/transformer](https://github.com/itrocks-ts/transformer#applytransformer)
  with [HTML and INPUT contexts](https://github.com/itrocks-ts/transformer#constants).
- Ignores properties that are not present in the target object.
- Skips properties explicitly marked as
  [IGNORE](https://github.com/itrocks-ts/transformer#ignoring-a-transformation-result)
  by the transformer.

### Example Use Cases

- Processing web form inputs safely (e.g. [@itrocks/save](https://github.com/itrocks-ts/save)).
- Mapping JSON API responses to strongly-typed objects.
- Cleaning and sanitizing data before storage or further processing.
