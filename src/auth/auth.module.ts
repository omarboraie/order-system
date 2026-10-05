import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from 'node_modules/@nestjs/mongoose/dist/mongoose.module';
import { User, UserSchema } from 'src/schemas/Users.schema';
import passport from 'passport';
import { PassportModule } from 'node_modules/@nestjs/passport/dist/passport.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { UsersService } from 'src/users/users.service';

@Module({
  imports:[ConfigModule.forRoot({
      isGlobal: true,
    }),PassportModule, JwtModule.register({ secret: process.env.JWT_SECRET , signOptions:{expiresIn: '1h'} }),MongooseModule.forFeature([
      {name:User.name,schema:UserSchema},
    ])],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy,UsersService]
})
export class AuthModule {}
