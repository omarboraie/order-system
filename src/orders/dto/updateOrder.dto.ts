import { IsArray,IsMongoId,IsOptional,Min} from "class-validator";
import { Address } from "src/schemas/Address.schema";

export class updateOrderDto {
    
    @IsOptional()
    @IsArray()
    products!:string[]
    
    @IsOptional()
    @IsMongoId()
    address!:Address;
}