import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCategoryDTO } from "./dto/create-category.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./categories.entity";
import { CategoryRepository } from "./categories.repository";

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryRepository)
    private categoryRepository: CategoryRepository,
  ) { }

  async getCategories(categoryDto: CreateCategoryDTO): Promise<Category[]> {
    return await this.categoryRepository.find(categoryDto);
  }

  async getCategoryById(id: string): Promise<Category> {
    const found = await this.categoryRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Category with ID "${id}" not found`);
    }

    return found;
  }

  async createCategory(categoryDto: CreateCategoryDTO): Promise<Category> {
    return this.categoryRepository.createCategory(categoryDto);
  }

  async updateCategory(id: string, roSlug: string, ruSlug: string, enSlug: string): Promise<Category> {
    const category = await this.getCategoryById(id);
    category.roSlug = roSlug;
    category.ruSlug = ruSlug;
    category.enSlug = enSlug;

    await category.save();
    return category;
  }

  async deleteCategory(id: number): Promise<void> {
    const result = await this.categoryRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Category with ID "${id}" not found`);
    }
  }
}
