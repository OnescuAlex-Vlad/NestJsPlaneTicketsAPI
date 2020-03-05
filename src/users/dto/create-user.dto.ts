import { IsNotEmpty } from "class-validator";
import { UserPermissions } from "../users-permissions.enum";

export class CreateUserDTO {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  permissions: UserPermissions;

  @IsNotEmpty()
  phone: number;

  @IsNotEmpty()
  email: string;
}
