import { CategoriesController } from './categories.controller';
import { CreateCategoryDto } from './dto/create-category.dto';

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
      execute: jest.fn().mockReturnValue(expectedOutput),
    };
    controller['createCategoryUseCase'] = mockCreateCategoryUseCase as any;

    const input: CreateCategoryDto = {
      name: 'Movie',
      description: 'some description',
      is_active: true,
    };
    const output = await controller.create(input);

    expect(mockCreateCategoryUseCase.execute).toHaveBeenCalledWith(input);
    expect(expectedOutput).toStrictEqual(output);
  });
});
