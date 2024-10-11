import {
  SearchableRepositoryInterface,
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
} from '../../../@seedwork/domain'
import {Category} from '../entities/category'

export namespace CategoryRepository {
  export type Filter = string
  export class SearchParams extends DefaultSearchParams<string> {}

  export class SearchResult extends DefaultSearchResult<Category, string> {}

  export interface Repository
    extends SearchableRepositoryInterface<
      Category,
      Filter,
      SearchResult,
      SearchParams
    > {}
}

export default CategoryRepository
