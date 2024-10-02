import { SearchResult } from "../../domain/repository/repository-contracts"
import { PaginationOutputDTOMapper } from "./pagination-output"

describe('PaginationOutputDTOMapper', () => {
  test('should convert a SearchResult to an output', () => {
    const searchResult = new SearchResult({
      items: ['fake'] as any,
      total: 1,
      current_page: 1,
      per_page: 1,
      sort: null,
      sort_dir: null,
      filter: null,
    })
    const output = PaginationOutputDTOMapper.toPaginationOutput(searchResult)
    expect(output).toStrictEqual({
       total: 1,
       current_page: 1,
       per_page: 1,
       last_page: 1,
    })
  })
})
