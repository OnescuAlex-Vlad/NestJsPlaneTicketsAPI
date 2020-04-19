import { Module } from "@nestjs/common";
import { OffersService } from "./offers.service";
import { OffersController } from "./offers.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OfferRepository } from "./offers.repository";
import { AuthModule } from "src/auth/auth.module";
import { MulterModule } from "@nestjs/platform-express";

@Module({
  imports: [
    TypeOrmModule.forFeature([OfferRepository]),
    AuthModule,
    MulterModule.register({
      dest: "./uploads",
    }),
  ],
  providers: [OffersService],
  controllers: [OffersController],
})
export class OffersModule { }
