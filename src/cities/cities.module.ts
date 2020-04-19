import { Module } from "@nestjs/common";
import { CitiesService } from "./cities.service";
import { CitiesController } from "./cities.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CityRepository } from "./cities.repository";
import { AuthModule } from "src/auth/auth.module";
import { MulterModule } from "@nestjs/platform-express";

@Module({
  imports: [
    TypeOrmModule.forFeature([CityRepository]),
    AuthModule,
    MulterModule.register({
      dest: "./uploads",
    }),
  ],
  providers: [CitiesService],
  controllers: [CitiesController],
})
export class CitiesModule { }
