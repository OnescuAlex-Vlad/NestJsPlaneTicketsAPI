import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity()
export class Country extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  roCountryName: string;

  @Column()
  ruCountryName: string;

  @Column()
  enCountryName: string;

  @Column()
  imageName: string;
}
