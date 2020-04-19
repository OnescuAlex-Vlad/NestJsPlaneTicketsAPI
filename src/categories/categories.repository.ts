import { EntityRepository, Repository } from "typeorm";
import { Category } from "./categories.entity";
import { CreateCategoryDTO } from "./dto/create-category.dto";

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {

  async createCategory(createCategoryDto: CreateCategoryDTO): Promise<Category> {

    const { roSlug, ruSlug, enSlug } = createCategoryDto;

    const category = new Category();
    category.roSlug = roSlug;
    category.ruSlug = ruSlug;
    category.enSlug = enSlug;

    category.save();

    return category;
  }
}
