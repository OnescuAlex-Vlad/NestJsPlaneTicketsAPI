import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtPayload } from "./jwt-payload.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { SystemUserRepository } from "./system-user.repository";
import { SystemUser } from "./system-user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(SystemUserRepository)
    private systemUserRepository: SystemUserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "topSecret",
    });
  }

  async validate(payload: JwtPayload): Promise<SystemUser> {
    const { username } = payload;
    const user = await this.systemUserRepository.findOne({ username });

    if (!username) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
