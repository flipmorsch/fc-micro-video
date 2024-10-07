import {
  PaginationOutputDTO,
  PaginationOutputDTOMapper,
} from '../../../@seedwork/application/dto/pagination-output'
import UseCase from '../../../@seedwork/application/use-case'
import CategoryRepository from '../../domain/repository/category.repository'
import {CategoryOutput, CategoryOutputMapper} from '../dto/category-output'
import {SearchInputDTO} from '../../../@seedwork/application/dto/search-input'

export default class ListCategoriesUseCase implements UseCase<Input, Output> {
  constructor(private categoryRepository: CategoryRepository.Repository) {}

  async execute(input: Input): Promise<Output> {
    const params = new CategoryRepository.SearchParams(input)
    const searchResult = await this.categoryRepository.search(params)
    return this.toOutput(searchResult)
  }

  private toOutput(searchResult: CategoryRepository.SearchResult): Output {
    return {
      items: searchResult.items.map(item =>
        CategoryOutputMapper.toOutput(item)
      ),
      ...PaginationOutputDTOMapper.toPaginationOutput(searchResult),
    }
  }
}

export type Input = SearchInputDTO

export type Output = PaginationOutputDTO<CategoryOutput>
