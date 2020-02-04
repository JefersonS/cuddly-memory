import { degreeToRadians, getCustomersInRageOf, getDistanceBetweenTwoPoints } from '../src/libs/geoLocation'

describe('geoLocation lib', () => {
  describe('degreeToRadians', () => {
    const testDegree = 1
    const expectedRadians = 0.0174533

    it('converts degrees to radians', () => {
      expect(degreeToRadians(testDegree)).toBe(expectedRadians)
    })

    it('fails when no degree is informed', () => {
      expect(() => degreeToRadians(null)).toThrow('Please inform the necessary param: degree')
    })
  })

  describe('getDistanceBetweenTwoPoints', () => {
    const initialPoint = {
      initialLatitude: -22.228274,
      initialLongitude: -45.899756
    }
    const finalPoint = {
      finalLatitude: -22.228399,
      finalLongitude: -45.898404
    }
    const expectedDistance = 140.042384
    const fakeInitialPoint = { ...initialPoint }
    fakeInitialPoint.initialLatitude = null

    it('gets the distance between two points', () => {
      expect(getDistanceBetweenTwoPoints(initialPoint, finalPoint)).toBe(expectedDistance)
    })

    it('fails when theres a missing param', () => {
      expect(() => getDistanceBetweenTwoPoints(fakeInitialPoint, finalPoint)).toThrow('Please provide all the necessary parameters')
    })
  })

  describe('getCustomersInRageOf', () => {
    const initialPoint = {
      initialLatitude: -22.228274,
      initialLongitude: -45.899756
    }
    const maxDistance = 100
    const customers = [
      {
        organization: 'Org 1',
        offices: [
          {
            location: 'Country 1',
            address: 'Somewhere 1',
            coordinates: '-22.228274,-45.899756'
          }
        ]
      },
      {
        organization: 'Org 2',
        offices: [
          {
            location: 'Country 2',
            address: 'Somewhere 2',
            coordinates: '-22.228474,-45.899756'
          },
          {
            location: 'Country 3',
            address: 'Somewhere 3',
            coordinates: '51.5014767,-0.0713608999999451'
          }
        ]
      },
      {
        organization: 'Org 4',
        offices: [
          {
            location: 'Country 4',
            address: 'Somewhere 4',
            coordinates: '51.5136102,-0.08757919999993646'
          }
        ]
      }
    ]

    it('Finds customers in range of distance', () => {
      expect(getCustomersInRageOf(initialPoint, maxDistance, customers)).toHaveLength(2)
      expect(getCustomersInRageOf(initialPoint, maxDistance, customers)[0]).toHaveProperty('name')
      expect(getCustomersInRageOf(initialPoint, maxDistance, customers)[0].name).toBe('Org 1')
      expect(getCustomersInRageOf(initialPoint, maxDistance, customers)[0].addresses).toHaveLength(1)
      expect(getCustomersInRageOf(initialPoint, maxDistance, customers)[1]).toHaveProperty('name')
      expect(getCustomersInRageOf(initialPoint, maxDistance, customers)[1].name).toBe('Org 2')
      expect(getCustomersInRageOf(initialPoint, maxDistance, customers)[1].addresses).toHaveLength(1)
    })

    it('fails when theres a missing param', () => {
      expect(() => getCustomersInRageOf(initialPoint, null, customers)).toThrow('Please provide all the necessary parameters')
    })
  })
})
