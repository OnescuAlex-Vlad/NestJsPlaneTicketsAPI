import { EntityRepository, Repository } from "typeorm";
import { Country } from "./countries.entity";
import { CountryDTO } from "./dto/countries.dto";

@EntityRepository(Country)
export class CountryRepository extends Repository<Country> {

  async createCountry(createCountryDTO: CountryDTO): Promise<Country> {

    const { title, roCountryName, ruCountryName, enCountryName, imageName } = createCountryDTO;

    const country = new Country();
    country.title = title;
    country.roCountryName = roCountryName;
    country.ruCountryName = ruCountryName;
    country.enCountryName = enCountryName;
    country.imageName = imageName;

    country.save();

    return country;
  }
}
