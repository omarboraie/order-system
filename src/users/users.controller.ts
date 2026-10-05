import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdareUser.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { UserInterceptor } from './interceptors/user.interceptor';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    // @Post()
    // @UsePipes(new ValidationPipe())
    // createUser(@Body() createUserDto: CreateUserDto) {
    //     const user = this.usersService.createUser(createUserDto);
    //     return user;
    // }

    @UseGuards(JwtAuthGuard,AdminGuard)
    @Get()
    @UseInterceptors(UserInterceptor)
    getAllUsers() {
        return this.usersService.getAllUsers();
    }

    
    @UseGuards(JwtAuthGuard)
    @Get(':username')
    async getUserByUsername(@Param('username') username: string) {
        const foundUser = await this.usersService.getUserByUsername(username);
        if(!foundUser) {
            throw new HttpException(`User with username ${username} not found`, 404);
        }
        return foundUser;
    }

    
    @UseGuards(JwtAuthGuard)
    @Patch(':username')
    @UsePipes(new ValidationPipe({whitelist: true}))
    async updateUser(@Param('username') username: string, @Body() updateUserDto: UpdateUserDto) {
        const updatedUser = await this.usersService.updateUser(username, updateUserDto);
        if(!updatedUser) {
            throw new HttpException(`User with username ${username} not found`, 404);
        }
        return updatedUser;
    }

    @UseGuards(JwtAuthGuard,AdminGuard)
    @Delete(':username')
    async deleteUser(@Param('username') username:string){
        const deletedUser = await this.usersService.deleteUser(username);
        if(!deletedUser) {
            throw new HttpException(`User with username ${username} not found`, 404);
        }
        return deletedUser;
    }

    @UseGuards(JwtAuthGuard, AdminGuard)
    @Patch(':id/admin')
    async setAdmin( @Param('id') id: string,@Body() body: { admin: boolean } ) {
        return this.usersService.setAdmin(id, body.admin);
        }
    }
