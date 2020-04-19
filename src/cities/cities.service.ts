import { Injectable, NotFoundException } from "@nestjs/common";
import { CityDTO } from "./dto/cities.dto";
import { City } from "./cities.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CityRepository } from "./cities.repository";

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(CityRepository)
    private cityRepository: CityRepository,
  ) { }

  async getCities(cityDto: CityDTO): Promise<City[]> {
    return await this.cityRepository.find(cityDto);
  }

  async getCitybyId(id: string): Promise<City> {
    const found = await this.cityRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`City with ID "${id}" not found`);
    }

    return found;
  }

  async createCity(createCityDTO: CityDTO): Promise<City> {
    return this.cityRepository.createCity(createCityDTO);
  }

  async updateCity(id: string, title: string, roCityName: string, ruCityName: string, enCityName: string, imageName: string): Promise<City> {
    const city = await this.getCitybyId(id);
    city.title = title;
    city.roCityName = roCityName;
    city.ruCityName = ruCityName;
    city.enCityName = enCityName;
    city.imageName = imageName;

    await city.save();
    return city;
  }

  async deleteCity(id: number): Promise<void> {
    const result = await this.cityRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`City with ID "${id}" not found`);
    }
  }

}
