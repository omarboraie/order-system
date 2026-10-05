import { IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username!: string;

    @IsEmail()
    @IsNotEmpty()
    email!: string;
    
    @IsString()
    @IsNotEmpty()
    @IsStrongPassword()
    password!: string;

    @IsOptional()
    admin?: boolean;

}