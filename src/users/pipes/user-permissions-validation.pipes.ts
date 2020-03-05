import { PipeTransform } from "@nestjs/common";

export class UserPermissionsValidationPipe implements PipeTransform {
  transform(value: any) {
    console.log("value", value);

    return value;
  }
}
