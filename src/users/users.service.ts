import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';import { Model } from 'mongoose';
import { User } from 'src/schemas/Users.schema';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdareUser.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    createUser(createUserDto: CreateUserDto){
        const newUser = new this.userModel(createUserDto);
        return newUser.save();
    }

    getAllUsers() {
        return this.userModel.find();
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
}
