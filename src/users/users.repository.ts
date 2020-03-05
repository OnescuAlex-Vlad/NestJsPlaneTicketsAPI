import { User } from "./users.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UserPermissions } from "./users-permissions.enum";
import { GetUsersFilterDto } from "./dto/get-users-filter.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async getUsers(filterDto: GetUsersFilterDto): Promise<User[]> {
    const { permissions, search } = filterDto;
    const query = this.createQueryBuilder("user");

    if (permissions) {
      query.andWhere("user.permissions = :permissions", { permissions });
    }

    if (search) {
      query.andWhere("(user.firstName LIKE :search OR user.lastName LIKE :search) ", { search: `%${search}%` });
    }

    const users = await query.getMany();
    return users;
  }

  async createUser(createUserDto: CreateUserDTO): Promise<User> {
    const { firstName, lastName, phone, email } = createUserDto;

    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.permissions = UserPermissions.Operator;
    user.phone = phone;
    user.email = email;

    user.save();

    return user;
  }
}
