import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from 'src/schemas/Orders.schema';
import { Products } from 'src/schemas/Products.schema';
import { User } from 'src/schemas/Users.schema';

@Injectable()
export class OrdersService {
    constructor(@InjectModel(Order.name) private readonly orderModel:Model<Order>,
@InjectModel(User.name) private readonly userModel:Model<User>,
@InjectModel(Products.name) private readonly productsModel:Model<Products>){}


}
