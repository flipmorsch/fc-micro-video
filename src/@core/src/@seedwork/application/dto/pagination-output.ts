import {SearchResult} from '../../domain/repository/repository-contracts'

export type PaginationOutputDTO<Item = any> = {
  items: Item[]
  total: number
  current_page: number
  per_page: number
  last_page: number
}

export class PaginationOutputDTOMapper {
  static toPaginationOutput(
    result: SearchResult
  ): Omit<PaginationOutputDTO, 'items'> {
    return {
      total: result.total,
      current_page: result.current_page,
      per_page: result.per_page,
      last_page: result.last_page,
    }
  }
}
