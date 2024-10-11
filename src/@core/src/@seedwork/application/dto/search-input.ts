import {SortDirection} from '../../domain'

export type SearchInputDTO = {
  page?: number
  per_page?: number
  sort?: string | null
  sort_dir?: SortDirection | null
  filter?: string | null
}
