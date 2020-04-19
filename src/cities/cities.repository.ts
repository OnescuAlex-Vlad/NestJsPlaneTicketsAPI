import { EntityRepository, Repository } from "typeorm";
import { City } from "./cities.entity";
import { CityDTO } from "./dto/cities.dto";

@EntityRepository(City)
export class CityRepository extends Repository<City> {

  async createCity(createCityDTO: CityDTO): Promise<City> {

    const { title, roCityName, ruCityName, enCityName, imageName } = createCityDTO;

    const city = new City();
    city.title = title;
    city.roCityName = roCityName;
    city.ruCityName = ruCityName;
    city.enCityName = enCityName;
    city.imageName = imageName;

    city.save();

    return city;
  }
}
