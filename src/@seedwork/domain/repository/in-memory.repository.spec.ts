import {Entity} from '../entity/entity'
import {NotFoundError} from '../errors/not-found.error'
import UniqueEntityId from '../value-objects/unique-entity-id.vo'
import {InMemoryRepository, InMemorySearchableRepository} from './in-memory.repository'

type StubEntityProps = {
  name: string
  price: number
}

class StubEntity extends Entity<StubEntityProps> {}
class StubInMemoryRepository extends InMemoryRepository<StubEntity> {}
class StubInMemorySearchableRepository extends InMemorySearchableRepository<StubEntity> {
  sortableFields: string[] = ['name']
  protected async applyFilter(items: StubEntity[], filter: string): Promise<StubEntity[]> {
    if (!filter) return items

    return items.filter(item => {
      return (
        item.props.name.toLowerCase().includes(filter.toLowerCase()) ||
        item.props.price.toString() === filter
      )
    })
  }
}

describe('InMemoryRepository Unit Tests', () => {
  let repository: StubInMemoryRepository
  beforeEach(() => {
    repository = new StubInMemoryRepository()
  })
  it('should insert a new entity', async () => {
    const entity = new StubEntity({name: 'test', price: 10})
    await repository.insert(entity)
    expect(entity.toJSON()).toStrictEqual(repository.items[0].toJSON())
    expect(repository.items.length).toBe(1)
  })

  it('should throw a error when try to find an entity that not exists', async () => {
    expect(repository.findById('fake id')).rejects.toThrow(
      new NotFoundError('Entity not found using ID fake id')
    )

    expect(repository.findById('831a4ff9-177c-4ef5-8b3c-2be43d5bc3df')).rejects.toThrow(
      new NotFoundError('Entity not found using ID 831a4ff9-177c-4ef5-8b3c-2be43d5bc3df')
    )
  })

  it('should find an entity by id', async () => {
    const entity = new StubEntity({name: 'test', price: 10})
    await repository.insert(entity)
    let result = await repository.findById(entity.id)
    expect(result.toJSON()).toStrictEqual(entity.toJSON())

    result = await repository.findById(entity.uniqueEntityId)
    expect(result.toJSON()).toStrictEqual(entity.toJSON())
  })

  it('should find all entities', async () => {
    const entity1 = new StubEntity({name: 'test', price: 10})
    await repository.insert(entity1)
    let result = await repository.findAll()
    expect(result).toStrictEqual([entity1])

    const entity2 = new StubEntity({name: 'test 2', price: 20})
    await repository.insert(entity2)
    result = await repository.findAll()
    expect(result).toHaveLength(2)
    expect(result).toStrictEqual([entity1, entity2])
  })

  it('should throw a error if entity not exists when try to update', async () => {
    const entity = new StubEntity({name: 'test', price: 10})
    expect(repository.update(entity)).rejects.toThrow(
      new NotFoundError(`Entity not found using ID ${entity.id}`)
    )
  })

  it('should throw a error if entity not exists when try to delete', async () => {
    const entity = new StubEntity({name: 'test', price: 10})
    expect(repository.delete(entity.id)).rejects.toThrow(
      new NotFoundError(`Entity not found using ID ${entity.id}`)
    )

    const uniqueEntityId = new UniqueEntityId()
    expect(repository.delete(uniqueEntityId)).rejects.toThrow(
      new NotFoundError(`Entity not found using ID ${uniqueEntityId}`)
    )
  })

  it('should update an entity', async () => {
    const entity = new StubEntity({name: 'test', price: 10})
    await repository.insert(entity)

    const newEntity = new StubEntity({name: 'test 2', price: 20}, entity.uniqueEntityId)
    await repository.update(newEntity)
    const result = await repository.findById(entity.id)
    expect(result.toJSON()).toStrictEqual(newEntity.toJSON())
  })

  it('should delete an entity', async () => {
    const entity = new StubEntity({name: 'test', price: 10})
    await repository.insert(entity)
    expect(repository.items).toHaveLength(1)
    await repository.delete(entity.id)
    expect(repository.items).toHaveLength(0)

    await repository.insert(entity)
    expect(repository.items).toHaveLength(1)
    await repository.delete(entity.uniqueEntityId)
    expect(repository.items).toHaveLength(0)
  })
})

describe('InMemorySearchableRepository Unit Tests', () => {
  let repository: StubInMemorySearchableRepository
  beforeEach(() => {
    repository = new StubInMemorySearchableRepository()
  })
  describe('applyFilter method', () => {})

  describe('applyFilter method', () => {})

  describe('applyFilter method', () => {})

  describe('search method', () => {})
})
