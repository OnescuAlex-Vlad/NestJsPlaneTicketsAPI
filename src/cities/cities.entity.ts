import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity()
export class City extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  roCityName: string;

  @Column()
  ruCityName: string;

  @Column()
  enCityName: string;

  @Column()
  imageName: string;
}
