import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema()
export class Address {
    @Prop({required:true,index:true})
    username!:string
    @Prop({required:true})
    building!: string;
    @Prop({required:true})
    street!: string;
    @Prop({required:true})
    city!: string;
    @Prop()
    primary!: boolean;
}

export const AddressSchema = SchemaFactory.createForClass(Address);