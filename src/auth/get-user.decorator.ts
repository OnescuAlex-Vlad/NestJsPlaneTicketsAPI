import { createParamDecorator } from "@nestjs/common";
import { SystemUser } from "./system-user.entity";

export const GetUser = createParamDecorator((data, req): SystemUser => {
  return req.user;
});
