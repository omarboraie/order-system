import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Products } from "./Products.schema";
import { Address } from "./Address.schema";
import { User } from "./Users.schema";

@Schema()
export class Order{
    @Prop({required:true})
    username!:string;
    @Prop({type:Number})
    totalAmount!:number;
    @Prop({type: [mongoose.Schema.Types.ObjectId],ref:'Products',required:true})
    products!:mongoose.Types.ObjectId[];
    @Prop({type: mongoose.Schema.Types.ObjectId,ref:'Address',required:true})
    address!:mongoose.Types.ObjectId;
}
export const OrderSchema = SchemaFactory.createForClass(Order);