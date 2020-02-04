/**
 * Clones an obj or array and all of its properties.
 * Use ONLY to clone simple properties like obj, arrays, strings, numbers.
 * DO NOT use to clone dates, functions or circular references
 * @param obj
 */
export const clone = (obj: {[key: string]: any}): {[key: string]: any} => {
  if (!obj || typeof obj !== 'object') {
    throw new Error('Please provide a valid object')
  }

  // @ts-ignore - ignoring [...obj] as the type obj has no iterator
  const newObj = obj.constructor === Array ? [...obj] : { ...obj }
  const props = Object.keys(obj)

  props.forEach(prop => {
    if (typeof obj[prop] === 'object') {
      newObj[prop] = clone(obj[prop])
    };
  })

  return newObj
}
