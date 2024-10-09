import { ListCategoriesUseCase } from '@fc/micro-video/category/application';
import { CategoriesController } from './categories.controller';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { SortDirection } from '@fc/micro-video/@seedwork/domain';

describe('CategoriesController', () => {
  let controller: CategoriesController;

  beforeEach(async () => {
    controller = new CategoriesController();
  });

  it('should create a category', async () => {
    const expectedOutput = {
      id: 'e9b40eb2-5934-4353-b842-e55a15d1a20e',
      name: 'Movie',
      description: 'some description',
      is_active: true,
      created_at: new Date(),
    };
    const mockCreateCategoryUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
    };
    controller['createCategoryUseCase'] = mockCreateCategoryUseCase as any;

    const input: CreateCategoryDto = {
      name: 'Movie',
      description: 'some description',
      is_active: true,
    };
    const output = await controller.create(input);
    expect(controller.create(input)).toBeInstanceOf(Promise);
    expect(mockCreateCategoryUseCase.execute).toHaveBeenCalledWith(input);
    expect(expectedOutput).toStrictEqual(output);
  });

  it('should update a category', async () => {
    const id = 'e9b40eb2-5934-4353-b842-e55a15d1a20e';
    const expectedOutput = {
      id,
      name: 'Movie',
      description: 'some description',
      is_active: true,
      created_at: new Date(),
    };
    const mockUpdateCategoryUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
    };
    controller['updateCategoryUseCase'] = mockUpdateCategoryUseCase as any;
    const input: UpdateCategoryDto = {
      name: 'Movie',
      description: 'some description',
      is_active: true,
    };
    const output = await controller.update(id, input);
    expect(controller.update(id, input)).toBeInstanceOf(Promise);
    expect(mockUpdateCategoryUseCase.execute).toHaveBeenCalledWith({
      id,
      ...input,
    });
    expect(expectedOutput).toStrictEqual(output);
  });

  it('should delete a category', async () => {
    const expectedOutput = undefined;
    const mockDeleteCategoryUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
    };
    controller['deleteCategoryUseCase'] = mockDeleteCategoryUseCase as any;
    const id = 'e9b40eb2-5934-4353-b842-e55a15d1a20e';
    const output = await controller.delete(id);
    expect(controller.delete(id)).toBeInstanceOf(Promise);
    expect(mockDeleteCategoryUseCase.execute).toHaveBeenCalledWith({ id });
    expect(output).toBeUndefined();
  });

  it('should get a category', async () => {
    const id = 'e9b40eb2-5934-4353-b842-e55a15d1a20e';
    const expectedOutput = {
      id,
      name: 'Movie',
      description: 'some description',
      is_active: true,
      created_at: new Date(),
    };
    const mockGetCategoryUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
    };
    controller['getCategoryUseCase'] = mockGetCategoryUseCase as any;
    const output = await controller.findOne(id);
    expect(controller.findOne(id)).toBeInstanceOf(Promise);
    expect(mockGetCategoryUseCase.execute).toHaveBeenCalledWith({ id });
    expect(expectedOutput).toStrictEqual(output);
  });

  it('should list categories', async () => {
    const expectedOutput: ListCategoriesUseCase.Output = {
      items: [
        {
          id: '9366b7dc-2d71-4799-b91c-c64adb205104',
          name: 'Movie',
          description: 'some description',
          is_active: true,
          created_at: new Date(),
        },
      ],
      current_page: 1,
      last_page: 1,
      per_page: 1,
      total: 1,
    };
    const mockListUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
    };
    controller['listCategoriesUseCase'] = mockListUseCase as any;
    const searchParams = {
      page: 1,
      per_page: 2,
      sort: 'name',
      sort_dir: 'desc' as SortDirection,
      filter: 'test',
    };
    const output = await controller.findAll(searchParams);
    expect(mockListUseCase.execute).toHaveBeenCalledWith(searchParams);
    expect(output).toStrictEqual(expectedOutput);
  });
});
