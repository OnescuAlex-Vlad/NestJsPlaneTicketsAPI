import { Repository, EntityRepository } from "typeorm";
import { Offer } from "./offer.entity";
import { OfferDto } from "./dto/offer.dto";

@EntityRepository(Offer)
export class OfferRepository extends Repository<Offer> {

  async createOffer(offerDto: OfferDto): Promise<Offer> {

    const { title, description, imageName } = offerDto;

    const offer = new Offer();
    offer.title = title;
    offer.description = description;
    offer.imageName = imageName;

    offer.save();

    return offer;
  }

}
