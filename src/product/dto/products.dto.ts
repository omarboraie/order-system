import { IsBoolean, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class ProductsDto{
    @IsString()
    @IsNotEmpty()
    productName!:string

    @IsNotEmpty()
    @IsString()
    description!:string

    @IsNumber()
    @Min(0)
    @IsNotEmpty()
    price!:number

    @IsNotEmpty()
    @IsBoolean()
    isAvailable!:boolean
}