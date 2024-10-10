import InvalidUuidError from '../errors/invalid-uuid.error'
import {UniqueEntityId} from './unique-entity-id.vo'

const spyValidateMethod = jest.spyOn(
  UniqueEntityId.prototype as any,
  'validate'
)

describe('UniqueEntityId Unit tests', () => {
  it('should throw error when uuid is invalid', () => {
    const validateSpy = spyValidateMethod
    expect(() => new UniqueEntityId('1234')).toThrow(InvalidUuidError)
    expect(validateSpy).toHaveBeenCalledTimes(1)
  })

  it('should create a new uuid when none is provided', () => {
    const validateSpy = spyValidateMethod
    const uuid = new UniqueEntityId()
    expect(uuid).toBeDefined()
    expect(validateSpy).toHaveBeenCalledTimes(1)
  })

  it('should create a new uuid when a valid uuid is provided', () => {
    const validUuid = 'e9b40eb2-5934-4353-b842-e55a15d1a20e'
    const validateSpy = spyValidateMethod
    const uuid = new UniqueEntityId(validUuid)
    expect(uuid).toBeDefined()
    expect(uuid.value).toBe(validUuid)
    expect(validateSpy).toHaveBeenCalledTimes(1)
  })
})
