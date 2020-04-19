import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  roSlug: string;

  @Column()
  ruSlug: string;

  @Column()
  enSlug: string;
}
