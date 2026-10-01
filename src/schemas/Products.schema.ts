import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Products{
  @Prop({ required: true })
  productName!: string;

  @Prop({ required: true })
  description!: string;

  @Prop({ required: true, min: 0 })
  price!: number;

  @Prop({ default: true })
  isAvailable!: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Products);