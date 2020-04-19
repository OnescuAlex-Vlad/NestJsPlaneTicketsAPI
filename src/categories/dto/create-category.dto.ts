import { IsNotEmpty } from "class-validator";
import { PrimaryGeneratedColumn } from "typeorm";

export class CreateCategoryDTO {
  @PrimaryGeneratedColumn()
  id: string;

  @IsNotEmpty()
  roSlug: string;

  @IsNotEmpty()
  ruSlug: string;

  @IsNotEmpty()
  enSlug: string;
}
