import UniqueEntityId from '../value-objects/unique-entity-id.vo'
import {Entity} from './entity'

class StubEntity extends Entity<{prop1: string; prop2: number}> {}

describe('Entity unit tests', () => {
  it('set props and id', () => {
    const arrange = {prop1: 'prop1', prop2: 2}
    const entity = new StubEntity(arrange)
    expect(entity.props).toStrictEqual(arrange)
    expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId)
    expect(entity.id).not.toBeNull()
    expect(entity.id).not.toBeUndefined()
  })

  it('should convert a entity to a JavaScript object', () => {
    const arrange = {prop1: 'prop1', prop2: 2}
    const entity = new StubEntity(arrange)
    expect(entity.toJSON()).toStrictEqual({...arrange, id: entity.id})
  })
})
