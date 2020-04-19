import { IsNotEmpty } from "class-validator";

export class CityDTO {

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  roCityName: string;

  @IsNotEmpty()
  ruCityName: string;

  @IsNotEmpty()
  enCityName: string;

  @IsNotEmpty()
  imageName: string;
}
