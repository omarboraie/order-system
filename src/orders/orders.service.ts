import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from 'src/schemas/Orders.schema';
import { Products } from 'src/schemas/Products.schema';
import { User } from 'src/schemas/Users.schema';
import { orderDto } from './dto/order.dto';
import { Address } from 'src/schemas/Address.schema';
import { updateOrderDto } from './dto/updateOrder.dto'
@Injectable()
export class OrdersService {
    constructor(@InjectModel(Order.name) private readonly orderModel:Model<Order>,
@InjectModel(User.name) private readonly userModel:Model<User>,
@InjectModel(Products.name) private readonly productsModel:Model<Products>,
@InjectModel(Address.name) private readonly addressModel:Model<Address>){}

 async createOrder(orderDto: orderDto,username:string) {
    const user = await this.userModel.findOne({ username });
    console.log(user);
        if (!user) {
            throw new HttpException('User Not Found!', 404);
        }
    const address = await this.addressModel.findOne({
        _id:orderDto.address,
        username:username
    })
    if (!address) {
            throw new HttpException('Address Not Found', 404);
        }
    const productsList = await this.productsModel.find({
        name: { $in: orderDto.products },
        });
        console.log(productsList);
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
 const newOrder = await this.orderModel.create({
    username: username,
    address: address._id,
    products: productsList.map((product) => product._id),
    totalAmount,
  });
  return newOrder;
}

getAll(){
    const allOrders = this.orderModel.find().populate('products','name').populate('address').exec();
    return allOrders;
}

async getOrderById(_id:string){
    const order = await this.orderModel.findById({_id}).populate('products','name').populate('address').exec();
    return order;
}


async deleteOrder(_id:string){
    const deletedOrder = await this.orderModel.findByIdAndDelete({_id})
    if(!deletedOrder){
        throw new HttpException('Order Not Found', 404);
    }
    return deletedOrder;
}

async updateOrder(_id:string,updateOrderDto: updateOrderDto,username:string){
        const user = await this.userModel.findOne({username});
        if(!user){
            throw new HttpException(`User not Found`,404);
        }
        const updateOrder = await this.orderModel.findOneAndUpdate({ _id },updateOrderDto,{returnDocument: 'after'});
        if(!updateOrder){
            throw new HttpException('Order Not Found', 404);
        }
        return updateOrder;
    }
}
