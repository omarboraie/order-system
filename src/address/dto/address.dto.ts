import { IsBoolean, IsNotEmpty, IsString , } from "class-validator";
import { User } from "src/schemas/Users.schema";

export class AddressDto {
    @IsString()
    @IsNotEmpty()
    username!:string

    @IsString()
    @IsNotEmpty()
    building!: string;
    
    @IsString()
    @IsNotEmpty()
    street!: string;
    
    @IsString()
    @IsNotEmpty()
    city!: string;

    @IsBoolean()
    primary!: boolean;

}