import { ArrayMinSize, IsArray, IsMongoId, IsNotEmpty, IsNumber , IsString, Min} from "class-validator";
import { Address } from "src/schemas/Address.schema";

export class orderDto{
    
    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(1)
    products!:string[]

    @IsNotEmpty()
    address!:Address;
}