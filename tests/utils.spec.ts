import { clone } from '../src/utils/utils'

describe('utils', () => {
  describe('clone', () => {
    let testObj = {}
    let testArray = []

    beforeEach(() => {
      testObj = {
        a: 1,
        b: 1,
        c: {
          d: 1,
          e: 1
        },
        d: [1, 1, 1]
      }
      testArray = [1, 1, { a: 1, b: 1, c: 1 }]
    })

    it('clones an obj', () => {
      const newObj = clone(testObj)
      expect(newObj).toStrictEqual(testObj)
      // @ts-ignore
      testObj.a = 2
      // @ts-ignore
      testObj.c.d = 2
      expect(newObj.a).toBe(1)
      expect(newObj.c.d).toBe(1)
    })

    it('clones an array', () => {
      const newArray = clone(testArray)
      expect(newArray).toStrictEqual(testArray)
      // @ts-ignore
      testArray[2].a = 2
      // @ts-ignore
      testArray.push(2)
      expect(newArray[2].a).toBe(1)
      expect(newArray).toHaveLength(testArray.length - 1)
    })

    it('fails when no obj is provided', () => {
      expect(() => clone(null)).toThrow('Please provide a valid object')
    })
  })
})
