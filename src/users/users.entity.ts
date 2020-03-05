import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";
import { UserPermissions } from "./users-permissions.enum";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  permissions: UserPermissions;

  @Column()
  phone: number;

  @Column()
  email: string;
}
