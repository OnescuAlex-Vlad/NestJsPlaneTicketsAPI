import { Injectable } from "@nestjs/common";
import { Country } from "./countries.model";

@Injectable()
export class CountriesService {
  private countries: Country[] = [];

  getAllCountries(): Country[] {
    return this.countries;
  }

  // createCountry(title: string) {
  //   const country: Country = {
  //     title
  //   }
  // }
}
