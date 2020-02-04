const EARTH_RADIUS = 6378137

export interface InitialPoint {
  initialLatitude: number;
  initialLongitude: number;
}

export interface FinalPoint {
  finalLatitude: number;
  finalLongitude: number;
}

export interface Address {
  location: string;
  address: string,
  coordinates: string
}

export interface CustomersInRange {
  name: string;
  addresses: Address[]
}

/**
 * Receives degrees and returns radians
 * Formula provided by Google conversions: 1° × π/180 = 0.01745rad
 * @param degree
 */
export const degreeToRadians = (degree: number): number => {
  if (!degree && degree !== 0) {
    throw new Error('Please inform the necessary param: degree')
  }
  return Number((degree * Math.PI / 180).toFixed(7))
}

/**
 * Receives two pairs of coordiantes and calculates the distance between them in meters
 * Formula: http://www.movable-type.co.uk/scripts/latlong.html
 * @param initialPoint is a key obj value containing both initialLatitude and initialLongitude
 * @param finalPoint is a key obj value containing both finalLatitude and finalLongitude
 */
export const getDistanceBetweenTwoPoints = (initialPoint: InitialPoint, finalPoint: FinalPoint): number => {
  const { initialLatitude, initialLongitude } = initialPoint
  const { finalLatitude, finalLongitude } = finalPoint

  if (!initialLatitude || !initialLongitude || !finalLatitude || !finalLongitude) {
    throw new Error('Please provide all the necessary parameters')
  }

  const initialLatitudeRadians = degreeToRadians(initialLatitude)
  const finalLatitudeRadians = degreeToRadians(finalLatitude)
  const distanceBetweenLatitudes = degreeToRadians(finalLatitude - initialLatitude)
  const distanceBetweenLongitudes = degreeToRadians(finalLongitude - initialLongitude)

  // the square of half the chord length between the points
  const a = Math.sin(distanceBetweenLatitudes / 2) * Math.sin(distanceBetweenLatitudes / 2) + Math.cos(initialLatitudeRadians) * Math.cos(finalLatitudeRadians) * Math.sin(distanceBetweenLongitudes / 2) * Math.sin(distanceBetweenLongitudes / 2)
  // the angular distance in radians
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return Number((EARTH_RADIUS * c).toFixed(6))
}

/**
 * Gets customers in max range of a initial point
 * @param initialPoint is a key value obj containing both initialLatitude and initialLongitude
 * @param maxDistance is a number in meters informing the max distance acceptable from intialPoint
 */
export const getCustomersInRageOf = (initialPoint: InitialPoint, maxDistance: number, customers: any[]): CustomersInRange[] => {
  if (!initialPoint || !maxDistance || !customers.length) {
    throw new Error('Please provide all the necessary parameters')
  }

  const customersInRange: CustomersInRange[] = []
  customers.forEach(customer => {
    const officesInDistance = customer.offices.filter(office => {
      const [finalLatitude, finalLongitude] = office.coordinates.split(',').map(Number)
      const distance = getDistanceBetweenTwoPoints(initialPoint, { finalLatitude, finalLongitude })
      return distance <= maxDistance
    })
    if (officesInDistance.length) {
      customersInRange.push({
        name: customer.organization,
        addresses: officesInDistance
      })
    }
  })

  return customersInRange
}
