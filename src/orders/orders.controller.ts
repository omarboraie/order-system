import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { orderDto } from './dto/order.dto';
import {updateOrderDto} from './dto/updateOrder.dto'
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AdminGuard } from 'src/auth/guards/admin.guard';

@Controller('orders')
export class OrdersController {
    constructor(private readonly OrdersService:OrdersService){}

    @Post(':username')
    async createOrder(@Param('username') username:string ,@Body() orderDto:orderDto){
        const newOrder = await this.OrdersService.createOrder(orderDto,username);
        return newOrder;
    }

    @UseGuards(JwtAuthGuard,AdminGuard)
    @Get()
    async getAllOrders(){
        const allOrders = await this.OrdersService.getAll();
        return allOrders;
    }

    @Delete(':id')
    async deleteOrder(@Param('id') _id:string){
        const deletedOrder = await this.OrdersService.deleteOrder(_id);
        return deletedOrder;
    }

    @Get(':id')
    async getOrderByID(@Param('id') _id:string){
        const order = await this.OrdersService.getOrderById(_id);
        return order;
    }
    
    @Patch(':username/:id')
    async updateOrder( @Param('id') _id: string, @Param('username') username: string, @Body() updateOrderDto: updateOrderDto) {
    const updatedOrder = await this.OrdersService.updateOrder(_id, updateOrderDto, username);
    return updatedOrder;
}
}
