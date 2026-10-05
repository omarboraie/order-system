import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';import { Model } from 'mongoose';
import { User } from 'src/schemas/Users.schema';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdareUser.dto';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    // async createUser(createUserDto: CreateUserDto){
    //     const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    //     const newUser = new this.userModel({ ...createUserDto, password: hashedPassword ,admin:false});
    //     return newUser.save();
    // }

    getAllUsers() {
        return this.userModel.find().lean();
    }
 
    getUserByUsername(username: string) {
        return this.userModel.findOne({ username });
    }

    updateUser(username: string, updateUserDto: UpdateUserDto) {
        return this.userModel.findOneAndUpdate({ username }, updateUserDto, { returnDocument: 'after' });
    }

    deleteUser(username: string) {
        return this.userModel.findOneAndDelete({ username });
    }

    async setAdmin(userId: string, admin: boolean) {
    const user = await this.userModel.findByIdAndUpdate(
        userId,
        { admin },
        { new: true },
    );

    if (!user) {
        throw new NotFoundException('User not found');
        }

    return user;
        }
    }
