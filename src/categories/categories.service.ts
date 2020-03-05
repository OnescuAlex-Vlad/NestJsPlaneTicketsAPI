import { Injectable } from "@nestjs/common";
import { Category } from "./categories.model";

@Injectable()
export class CategoriesService {
  private categories: Category[] = [];

  getAllCategories(): Category[] {
    return this.categories;
  }

  // createCategory(roSlug: string, ruSlug: string, enSlug: string): Category {
  //   const category: Category = {
  //     id: uuid(),
  //     roSlug,
  //     ruSlug,
  //     enSlug,
  //   };

  //   this.categories.push(category);
  //   return category;
  // }
}
