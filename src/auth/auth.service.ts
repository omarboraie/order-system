import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/Users.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/CreateUser.dto';


@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private readonly userModel:Model<User>,private readonly jwtService: JwtService,) {}

    async register(createUserDto: CreateUserDto) {
        const existingUser = await this.userModel.findOne({
        username: createUserDto.username,
     });

        if (existingUser) {
            throw new HttpException('Username already exists', 409);
        }

        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

        const user = await this.userModel.create({
            username: createUserDto.username,
            email: createUserDto.email,
            password: hashedPassword,
            admin: false,
        });

        return {
            username: user.username,
            admin: user.admin,
         };
}

    async validateUser(username: string, password: string) {
        const user = await this.userModel.findOne({ username });
        if (!user) {
            throw new HttpException('User Not Found', 404);
        }

        const validatePassword = await bcrypt.compare(password, user.password);
        if (!validatePassword) {
            throw new HttpException('Error inputs wrong', 401);
        }

        const payload = {
            subject: user._id,
            username: user.username,
            admin:user.admin
        }

        return { token: this.jwtService.sign(payload) };
    }
}
