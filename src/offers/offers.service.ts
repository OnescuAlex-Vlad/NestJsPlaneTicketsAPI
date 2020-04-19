import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OfferRepository } from "./offers.repository";
import { OfferDto } from "./dto/offer.dto";
import { Offer } from "./offer.entity";

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(OfferRepository)
    private offerRepository: OfferRepository) { }

  async getOffers(offerDto: OfferDto): Promise<Offer[]> {
    return await this.offerRepository.find(offerDto);
  }

  async getOfferById(id: string): Promise<Offer> {
    const found = await this.offerRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Offer with ID "${id}" not found`);
    }

    return found;
  }

  async createOffer(offerDto: OfferDto): Promise<Offer> {
    return await this.offerRepository.createOffer(offerDto);
  }

  async updateOffer(
    id: string, title: string, description: string, imageName: string,
  ): Promise<Offer> {
    const offer = await this.getOfferById(id);
    offer.title = title;
    offer.description = description;
    offer.imageName = imageName;

    await offer.save();
    return offer;
  }

  async deleteOffer(id: number): Promise<void> {
    const result = await this.offerRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Offer with ID "${id}" not found`);
    }
  }
}
