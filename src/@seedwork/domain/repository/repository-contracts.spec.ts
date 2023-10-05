import {SearchParams} from './repository-contracts'

describe('SearchParams Unit Tests', () => {
  test('page prop', () => {
    const params = new SearchParams()
    expect(params.page).toBe(1)

    const arrange = [
      {page: null, expected: 1},
      {page: undefined, expected: 1},
      {page: '', expected: 1},
      {page: ' ', expected: 1},
      {page: 'a', expected: 1},
      {page: -1, expected: 1},
      {page: 0, expected: 1},
      {page: 5.5, expected: 1},
      {page: -5.5, expected: 1},
      {page: true, expected: 1},
      {page: false, expected: 1},
      {page: 1, expected: 1},
      {page: {}, expected: 1},
    ]

    arrange.forEach(i => {
      expect(new SearchParams({page: i.page as any}).page).toBe(i.expected)
    })
  })

  test('per_page prop', () => {
    const params = new SearchParams()
    expect(params.per_page).toBe(15)

    const arrange = [
      {per_page: null, expected: 15},
      {per_page: undefined, expected: 15},
      {per_page: '', expected: 15},
      {per_page: ' ', expected: 15},
      {per_page: 'a', expected: 15},
      {per_page: -1, expected: 15},
      {per_page: 0, expected: 15},
      {per_page: 5.5, expected: 15},
      {per_page: -5.5, expected: 15},
      {per_page: true, expected: 15},
      {per_page: false, expected: 15},
      {per_page: {}, expected: 15},
      {per_page: 1, expected: 1},
    ]

    arrange.forEach(i => {
      expect(new SearchParams({per_page: i.per_page as any}).per_page).toBe(i.expected)
    })
  })
})
