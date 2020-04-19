import { Module } from "@nestjs/common";
import { CategoriesController } from "./categories.controller";
import { CategoriesService } from "./categories.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryRepository } from "./categories.repository";
import { AuthModule } from "src/auth/auth.module";
import { MulterModule } from "@nestjs/platform-express";

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryRepository]),
    AuthModule,
    MulterModule.register({
      dest: "./uploads",
    }),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule { }
