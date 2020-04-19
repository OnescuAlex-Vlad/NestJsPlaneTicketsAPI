import { Repository, EntityRepository } from "typeorm";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { SystemUser } from "./system-user.entity";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";

@EntityRepository(SystemUser)
export class SystemUserRepository extends Repository<SystemUser> {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const systemUser = new SystemUser();
    systemUser.username = username;
    systemUser.salt = await bcrypt.genSalt();
    systemUser.password = await this.hashPassword(password, systemUser.salt);

    try {
      await systemUser.save();
    } catch (error) {
      if (error.code === "ER_DUP_ENTRY") {
        throw new ConflictException("Username already Exists");
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { username, password } = authCredentialsDto;
    const user = await this.findOne({ username });

    if (user && await user.validatePassword(password)) {
      return user.username;
    } else {
      return null;
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
