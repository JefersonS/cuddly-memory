// NodeJS utils
import { inspect } from 'util'

import { customers } from './src/libs/customers'
import { clone } from './src/utils/utils'
import { getCustomersInRageOf } from './src/libs/geoLocation'

const obj = { prop1: 1, prop2: 2, prop3: { prop1: 1, prop2: 2 } }
const maxDistance = 100000 // in meters
const initialPosition = {
  initialLatitude: 51.515419,
  initialLongitude: -0.141099
}

/**
 * Question one: deep clone an obj
 * @param obj
 */
const questionOne = (obj: {[key: string]: any}) => {
  const clonedObj = clone(obj)
  obj.prop1 = 2
  obj.prop3.prop1 = 2
  console.log(obj)
  console.log(clonedObj)
}

/**
 * Question two: list all customers in the range of max range
 * @param initialPosition
 * @param maxDistance
 * @param customers
 */
const questionTwo = (initialPosition, maxDistance: number, customers: any) => {
  console.log(inspect(getCustomersInRageOf(initialPosition, maxDistance, customers), { showHidden: false, depth: null }))
}

questionOne(obj)
questionTwo(initialPosition, maxDistance, customers)
