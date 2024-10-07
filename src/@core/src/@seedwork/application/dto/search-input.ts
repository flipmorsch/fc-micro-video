import {SortDirection} from '@core/src/@seedwork/domain/repository/repository-contracts'

export type SearchInputDTO = {
  page?: number
  per_page?: number
  sort?: string | null
  sort_dir?: SortDirection | null
  filter?: string | null
}
