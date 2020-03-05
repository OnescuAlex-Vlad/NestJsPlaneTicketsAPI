import { Controller, Get, Post, Body } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { Category } from "./categories.model";

@Controller("categories")
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) { }

  @Get()
  getAllCategories(): Category[] {
    return this.categoriesService.getAllCategories();
  }

  // @Post()
  // createCategory(
  //   @Body("roSlug") roSlug: string,
  //   @Body("ruSlug") ruSlug: string,
  //   @Body("enSlug") enSlug: string,
  // ): Category {
  //   return this.categoriesService.createCategory(roSlug, ruSlug, enSlug);
  // }
}
