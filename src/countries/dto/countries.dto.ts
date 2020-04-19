import { IsNotEmpty } from "class-validator";

export class CountryDTO {

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  roCountryName: string;

  @IsNotEmpty()
  ruCountryName: string;

  @IsNotEmpty()
  enCountryName: string;

  @IsNotEmpty()
  imageName: string;
}
