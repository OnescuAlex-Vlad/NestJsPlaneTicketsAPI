import { UserPermissions } from "../users-permissions.enum";
import { IsOptional, IsIn, IsNotEmpty } from "class-validator";

export class GetUsersFilterDto {
  @IsOptional()
  @IsIn([UserPermissions.Administrator, UserPermissions.Operator])
  permissions: UserPermissions;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
