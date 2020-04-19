import { Controller, UseGuards, Post, Body, UseInterceptors, UploadedFile, Get, Param, Res, Put, Delete } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CountriesService } from "./countries.service";
import { CountryDTO } from "./dto/countries.dto";
import { Country } from "./countries.entity";
import { FileInterceptor } from "@nestjs/platform-express";
import { editFileName, imageFileFilter } from "src/utils/file-uploading.utils";
import { diskStorage } from "multer";

@Controller("countries")
@UseGuards(AuthGuard())
export class CountriesController {
  constructor(private countryService: CountriesService) { }

  @Get()
  async findAll(countryDTO: CountryDTO): Promise<Country[]> {
    return await this.countryService.getCountries(countryDTO);
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
  async createCountry(@Body() createCountryDTO: CountryDTO, @UploadedFile() file): Promise<Country> {

    createCountryDTO.imageName = "http://localhost:8080/countries/" + file.filename;
    return await this.countryService.createCountry(createCountryDTO);
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
  async updateCountry(
    @Param("id") id: string,
    @Body("title") title: string,
    @Body("roCountryName") roCountryName: string,
    @Body("ruCountryName") ruCountryName: string,
    @Body("enCountryName") enCountryName: string,
    @Body("imageName") imageName: string,
    @UploadedFile() file,
  ): Promise<Country> {
    imageName = "http://localhost:8080/countries/" + file.filename;
    return await this.countryService.updateCountry(id, title, roCountryName, ruCountryName, enCountryName, imageName);
  }

  @Delete("/:id")
  deleteCountry(@Param("id") id: number): Promise<void> {
    return this.countryService.deleteCountry(id);
  }

}
