import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber , IsString, Min} from "class-validator";

export class orderDto{

    @IsNotEmpty()
    @IsString()
    username!:string

    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(1)
    products!:string[]

    @IsNotEmpty()
    address!:string;
}