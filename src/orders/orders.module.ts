import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Order,OrderSchema } from 'src/schemas/Orders.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Products, ProductSchema } from 'src/schemas/Products.schema';
import { User, UserSchema } from 'src/schemas/Users.schema';
import { Address, AddressSchema } from 'src/schemas/Address.schema';

@Module({
  imports:[MongooseModule.forFeature([
    {name:Order.name,schema:OrderSchema},
    {name:Products.name,schema:ProductSchema},
    {name:User.name,schema:UserSchema},
    {name:Address.name,schema:AddressSchema}
  ])],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}
