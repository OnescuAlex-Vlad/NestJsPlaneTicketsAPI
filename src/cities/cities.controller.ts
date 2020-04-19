import { Controller, UseGuards, Post, Body, UseInterceptors, UploadedFile, Get, Param, Res, Delete, Put } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CitiesService } from "./cities.service";
import { CityDTO } from "./dto/cities.dto";
import { City } from "./cities.entity";
import { FileInterceptor } from "@nestjs/platform-express";
import { editFileName, imageFileFilter } from "src/utils/file-uploading.utils";
import { diskStorage } from "multer";

@Controller("cities")
@UseGuards(AuthGuard())
export class CitiesController {
  constructor(private cityService: CitiesService) { }

  @Get()
  async findAll(cityDTO: CityDTO): Promise<City[]> {
    return await this.cityService.getCities(cityDTO);
  }

  @Get(":imgpath")
  seeUploadedFile(@Param("imgpath") image, @Res() res) {
    return res.sendFile(image, { root: "./uploads" });
  }

  @Post()
  @UseInterceptors(
    FileInterceptor("image", {
      storage: diskStorage({
        destination: "./uploads",
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async createCity(@Body() createCityDTO: CityDTO, @UploadedFile() file): Promise<City> {

    createCityDTO.imageName = "http://localhost:8080/cities/" + file.filename;
    return await this.cityService.createCity(createCityDTO);
  }

  @Put("/:id")
  @UseInterceptors(
    FileInterceptor("image", {
      storage: diskStorage({
        destination: "./uploads",
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async updateCity(
    @Param("id") id: string,
    @Body("title") title: string,
    @Body("roCityName") roCityName: string,
    @Body("ruCityName") ruCityName: string,
    @Body("enCityName") enCityName: string,
    @Body("imageName") imageName: string,
    @UploadedFile() file,
  ): Promise<City> {
    imageName = "http://localhost:8080/cities/" + file.filename;
    return await this.cityService.updateCity(id, title, roCityName, ruCityName, enCityName, imageName);
  }

  @Delete("/:id")
  deleteCity(@Param("id") id: number): Promise<void> {
    return this.cityService.deleteCity(id);
  }

}
