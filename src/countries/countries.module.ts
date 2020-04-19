import { Module } from "@nestjs/common";
import { CountriesController } from "./countries.controller";
import { CountriesService } from "./countries.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CountryRepository } from "./countries.repository";
import { AuthModule } from "src/auth/auth.module";
import { MulterModule } from "@nestjs/platform-express";

@Module({
  imports: [
    TypeOrmModule.forFeature([CountryRepository]),
    AuthModule,
    MulterModule.register({
      dest: "./uploads",
    }),
  ],
  controllers: [CountriesController],
  providers: [CountriesService],
})
export class CountriesModule { }
