import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from 'src/schemas/Orders.schema';
import { Products } from 'src/schemas/Products.schema';
import { User } from 'src/schemas/Users.schema';
import { orderDto } from './dto/order.dto';
import { Address } from 'src/schemas/Address.schema';

@Injectable()
export class OrdersService {
    constructor(@InjectModel(Order.name) private readonly orderModel:Model<Order>,
@InjectModel(User.name) private readonly userModel:Model<User>,
@InjectModel(Products.name) private readonly productsModel:Model<Products>){}

 async createOrder(orderDto: orderDto,) {
    const user = await this.userModel.findOne({ username:orderDto.username });
        if (!user) {
            throw new HttpException('User Not Found', 404);
        }
    const productsList = await this.productsModel.find({
        productName: { $in: orderDto.products },
        });
    const availableProducts = productsList.filter((product) => {
        if (!product.isAvailable) {
            console.log(`${product.productName} is not available`);
            return false;
        }
        return true;
    });
    
    let totalAmount:number=0;
    for(const product of availableProducts){
        totalAmount += product.price;
    }
    const newOrder = await this.orderModel.create({username:orderDto.username,totalAmount,products: availableProducts.map((product) => product._id),address:orderDto.address})
}

}
