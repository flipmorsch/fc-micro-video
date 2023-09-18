import InvalidUuidError from '../errors/invalid-uuid.error'
import UniqueEntityID from './unique-entity-id.vo'

describe('UniqueEntityID Unit tests', () => {
  it('should throw error when uuid is invalid', () => {
    const validateSpy = jest.spyOn(UniqueEntityID.prototype as any, 'validate')
    expect(() => new UniqueEntityID('1234')).toThrow(InvalidUuidError)
    expect(validateSpy).toHaveBeenCalledTimes(1)
  })

  it('should create a new uuid when none is provided', () => {
    const validateSpy = jest.spyOn(UniqueEntityID.prototype as any, 'validate')
    const uuid = new UniqueEntityID()
    expect(uuid).toBeDefined()
    expect(validateSpy).toHaveBeenCalledTimes(1)
  })
})
