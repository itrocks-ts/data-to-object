import { ReflectClass }          from '@itrocks/reflect'
import { toProperty }            from '@itrocks/rename'
import { RecursiveStringObject } from '@itrocks/request-response'
import { applyTransformer }      from '@itrocks/transformer'
import { HTML, IGNORE, INPUT }   from '@itrocks/transformer'

export async function dataToObject<T extends object>(object: T, data: RecursiveStringObject)
{
	const properties = new ReflectClass(object).propertyNames
	for (let fieldName in data) {
		if (fieldName.endsWith('_id')) {
			fieldName = fieldName.slice(0, -3)
			if (fieldName in data) continue
		}
		const propertyName = toProperty(fieldName)
		if (!properties.includes(propertyName)) continue
		const value = await applyTransformer(data[fieldName], object, propertyName, HTML, INPUT, data)
		if (value === IGNORE) continue
		object[propertyName] = value
	}
}
