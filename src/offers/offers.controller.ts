import { Controller, Post, UseInterceptors, Body, UploadedFiles, Get, Param, Res, Put, Delete, UseGuards } from "@nestjs/common";
import { OffersService } from "./offers.service";
import { FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { editFileName, imageFileFilter } from "src/utils/file-uploading.utils";
import { OfferDto } from "./dto/offer.dto";
import { Offer } from "./offer.entity";
import { AuthGuard } from "@nestjs/passport";

@Controller("offers")
@UseGuards(AuthGuard())
export class OffersController {
  constructor(private offerService: OffersService) { }

  @Get()
  async findAll(offerDto: OfferDto): Promise<Offer[]> {
    return await this.offerService.getOffers(offerDto);
  }

  @Get(":imgpath")
  seeUploadedFile(@Param("imgpath") image, @Res() res) {
    return res.sendFile(image, { root: "./uploads" });
  }

  @Post()
  @UseInterceptors(
    FilesInterceptor("image", 20, {
      storage: diskStorage({
        destination: "./uploads",
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async createCountry(@Body() offerDto: OfferDto, @UploadedFiles() files): Promise<Offer> {

    const response = [];

    offerDto.imageName = "http://localhost:8080/offers/" + files.forEach(file => {
      const fileResponse = {
        originalname: file.originalname,
        filename: file.filename,
      };
      response.push(fileResponse);
    });
    return await this.offerService.createOffer(offerDto);
  }

  @Put("/:id")
  @UseInterceptors(
    FilesInterceptor("image", 20, {
      storage: diskStorage({
        destination: "./uploads",
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async updateoffer(
    @Param("id") id: string,
    @Body("title") title: string,
    @Body("description") description: string,
    @Body("imageName") imageName: string,
    @UploadedFiles() file,
  ): Promise<Offer> {
    imageName = "http://localhost:8080/offers/" + file.filename;
    return await this.offerService.updateOffer(id, title, description, imageName);
  }

  @Delete("/:id")
  deleteCountry(@Param("id") id: number): Promise<void> {
    return this.offerService.deleteOffer(id);
  }
}
