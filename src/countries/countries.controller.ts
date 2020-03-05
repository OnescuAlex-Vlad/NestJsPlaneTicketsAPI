import { Controller, Get } from "@nestjs/common";
import { CountriesService } from "./countries.service";
import { Country } from "./countries.model";

@Controller("countries")
export class CountriesController {
  constructor(private countriesService: CountriesService) { }

  @Get()
  getAllCountries(): Country[] {
    return this.countriesService.getAllCountries();
  }
}
