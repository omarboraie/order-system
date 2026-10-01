import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Products } from "./Products.schema";
import { Address } from "./Address.schema";

@Schema()
export class Order{
    @Prop({required:true,index:true})
    username!:string
    @Prop({type:Number})
    totalAmount!:number;
    @Prop({type: [mongoose.Schema.Types.ObjectId],ref:'Products',required:true})
    products!:Products[];
    @Prop({type: mongoose.Schema.Types.ObjectId,ref:'Address',required:true})
    address!:Address;
}
export const OrderSchema = SchemaFactory.createForClass(Order);