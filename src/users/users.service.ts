import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UserRepository } from "./users.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { UserPermissions } from "./users-permissions.enum";
import { GetUsersFilterDto } from "./dto/get-users-filter.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) { }

  // async getAllUsers(page: number = 1, rowsPerPage: number) {
  //   const [selectedItems, totalNumberOfItems] = await this.userRepository.findAndCount({
  //     take: rowsPerPage,
  //     skip: rowsPerPage * (page - 1),
  //   });
  //   return { selectedItems, totalNumberOfItems };
  // }

  async getUsers(filterDto: GetUsersFilterDto): Promise<User[]> {
    return this.userRepository.getUsers(filterDto);
  }

  async getUserById(id: number): Promise<User> {
    const found = await this.userRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    return found;
  }

  async createUser(createUserDTO: CreateUserDTO): Promise<User> {
    return this.userRepository.createUser(createUserDTO);
  }

  async deleteUser(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
  }

  async updateUser(id: number, firstName: string, lastName: string, permissions: UserPermissions, phone: number, email: string): Promise<User> {
    const user = await this.getUserById(id);
    user.firstName = firstName;
    user.lastName = lastName;
    user.permissions = permissions;
    user.phone = phone;
    user.email = email;

    await user.save();
    return user;
  }

}
