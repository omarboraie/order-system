import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdareUser.dto';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Post()
    @UsePipes(new ValidationPipe())
    createUser(@Body() createUserDto: CreateUserDto) {
        const user = this.usersService.createUser(createUserDto);
        return user;
    }

    @Get()
    getAllUsers() {
        return this.usersService.getAllUsers();
    }

    @Get(':username')
    async getUserByUsername(@Param('username') username: string) {
        const foundUser = await this.usersService.getUserByUsername(username);
        if(!foundUser) {
            throw new HttpException(`User with username ${username} not found`, 404);
        }
        return foundUser;
    }

    @Patch(':username')
    @UsePipes(new ValidationPipe({whitelist: true}))
    async updateUser(@Param('username') username: string, @Body() updateUserDto: UpdateUserDto) {
        const updatedUser = await this.usersService.updateUser(username, updateUserDto);
        if(!updatedUser) {
            throw new HttpException(`User with username ${username} not found`, 404);
        }
        return updatedUser;
    }

    @Delete(':username')
    async deleteUser(@Param('username') username:string){
        const deletedUser = await this.usersService.deleteUser(username);
        if(!deletedUser) {
            throw new HttpException(`User with username ${username} not found`, 404);
        }
        return deletedUser;
    }
}
