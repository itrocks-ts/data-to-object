import { ReflectClass }          from '@itrocks/reflect'
import { RecursiveStringObject } from '@itrocks/request-response'
import { applyTransformer }      from '@itrocks/transformer'
import { HTML, IGNORE, INPUT }   from '@itrocks/transformer'

export async function dataToObject<T extends object>(object: T, data: RecursiveStringObject)
{
	const properties = new ReflectClass(object).propertyNames
	for (const property in data) {
		if (!properties.includes(property)) continue
		const value = await applyTransformer(data[property], object, property, HTML, INPUT, data)
		if (value === IGNORE) continue
		object[property] = value
	}
}
