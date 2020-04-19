import { Injectable, Get, NotFoundException } from "@nestjs/common";
import { CountryDTO } from "./dto/countries.dto";
import { Country } from "./countries.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CountryRepository } from "./countries.repository";

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(CountryRepository)
    private countryRepository: CountryRepository,
  ) { }

  async getCountries(countryDTO: CountryDTO): Promise<Country[]> {
    return await this.countryRepository.find(countryDTO);
  }

  async getCountryById(id: string): Promise<Country> {
    const found = await this.countryRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Country with ID "${id}" not found`);
    }

    return found;
  }

  async createCountry(createCountryDTO: CountryDTO): Promise<Country> {
    return this.countryRepository.createCountry(createCountryDTO);
  }

  async updateCountry(
    id: string, title: string, roCountryName: string, ruCountryName: string, enCountryName: string, imageName: string,
  ): Promise<Country> {
    const country = await this.getCountryById(id);
    country.title = title;
    country.roCountryName = roCountryName;
    country.ruCountryName = ruCountryName;
    country.enCountryName = enCountryName;
    country.imageName = imageName;

    await country.save();
    return country;
  }

  async deleteCountry(id: number): Promise<void> {
    const result = await this.countryRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Country with ID "${id}" not found`);
    }
  }

}
