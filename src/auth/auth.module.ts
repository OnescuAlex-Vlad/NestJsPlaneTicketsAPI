import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SystemUserRepository } from "./system-user.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([SystemUserRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
