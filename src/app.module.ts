import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CountriesModule } from "./countries/countries.module";
import { CategoriesModule } from "./categories/categories.module";
import { UsersModule } from "./users/users.module";
import { OffersModule } from "./offers/offers.module";
import { CitiesModule } from "./cities/cities.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    CountriesModule,
    CategoriesModule,
    UsersModule,
    OffersModule,
    CitiesModule,
    AuthModule,
    MulterModule.register({
      dest: "./uploads",
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
