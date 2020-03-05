import { IsString, MinLength, MaxLength, Matches } from "class-validator";

export class AuthCredentialsDto {

  @IsString()
  @MinLength(4)
  @MaxLength(25)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(25)
  //  @Matches(
  //   /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/
  //   { message: "password too weak"})
  password: string;
}
