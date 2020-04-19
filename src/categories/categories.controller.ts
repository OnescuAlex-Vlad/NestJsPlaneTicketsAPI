import { Controller, Get, Post, Body, Delete, Param, Put, ParseIntPipe, UseGuards } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { Category } from "./categories.entity";
import { CreateCategoryDTO } from "./dto/create-category.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller("categories")
@UseGuards(AuthGuard())
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) { }

  @Get()
  async findAll(categoryDto: CreateCategoryDTO): Promise<Category[]> {
    return await this.categoriesService.getCategories(categoryDto);
  }

  @Post()
  async createCategory(@Body() categoryDto: CreateCategoryDTO): Promise<Category> {
    return await this.categoriesService.createCategory(categoryDto);
  }

  @Put("/:id")
  async updateCategory(
    @Param("id") id: string,
    @Body("roSlug") roSlug: string,
    @Body("ruSlug") ruSlug: string,
    @Body("enSlug") enSlug: string,
  ): Promise<Category> {
    return await this.categoriesService.updateCategory(id, roSlug, ruSlug, enSlug);
  }

  @Delete("/:id")
  deleteCategory(@Param("id") id: number): Promise<void> {
    return this.categoriesService.deleteCategory(id);
  }
}
