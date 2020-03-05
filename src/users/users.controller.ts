import { Controller, Get, Post, Body, Param, Delete, Put, UsePipes, ValidationPipe, ParseIntPipe, Query } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDTO } from "./dto/create-user.dto";
import { User } from "./users.entity";
import { UserPermissions } from "./users-permissions.enum";
import { GetUsersFilterDto } from "./dto/get-users-filter.dto";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) { }

  // @Get()
  // getAllUsers(@Query("page") page: number, @Query("limit") rowsPerPage: number) {
  //   return this.usersService.getAllUsers(page, rowsPerPage);
  // }

  @Get()
  getUsers(@Query(ValidationPipe) filterDto: GetUsersFilterDto): Promise<User[]> {
    return this.usersService.getUsers(filterDto);
  }

  @Get("/:id")
  getUserById(@Param("id", ParseIntPipe) id: number): Promise<User> {
    return this.usersService.getUserById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDTO: CreateUserDTO): Promise<User> {
    return this.usersService.createUser(createUserDTO);
  }

  @Delete("/:id")
  deleteUser(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.usersService.deleteUser(id);
  }

  @Put("/:id")
  updateUser(
    @Param("id", ParseIntPipe) id: number,
    @Body("firstName") firstName: string,
    @Body("lastName") lastname: string,
    @Body("permissions") permissions: UserPermissions,
    @Body("phone") phone: number,
    @Body("email") email: string,
  ): Promise<User> {
    return this.usersService.updateUser(id, firstName, lastname, permissions, phone, email);
  }
}
