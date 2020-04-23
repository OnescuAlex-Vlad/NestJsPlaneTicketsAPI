import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";
import { OfferCategoriesEnum } from "./offerCategories.enum";
import { OfferCountriesEnum } from "./offerCountries.enum";
import { OfferCitiesEnum } from "./offerCities.enum";

@Entity()
export class Offer extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  seoPageTitle: string;

  @Column()
  seoPageSlug: string;

  @Column()
  seoPageDescription: string;

  @Column()
  price: number;

  @Column()
  supply: string;

  @Column()
  departTime: string;

  @Column()
  returnTime: string;

  @Column()
  hotelAddress: string;

  @Column()
  offerCategoriesEnum: OfferCategoriesEnum;

  @Column()
  offerCountriesEnum: OfferCountriesEnum;

  @Column()
  offerCitiesEnum: OfferCitiesEnum;

  @Column()
  nights: number;

  @Column()
  description: string;

  @Column()
  imageName: string;
}
