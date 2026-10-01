import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Products } from 'src/schemas/Products.schema';
import { ProductsDto } from './dto/products.dto';

@Injectable()
export class ProductService {
    constructor(@InjectModel(Products.name) private productsModel:Model<Products>){}
    
    async addProduct(productDto:ProductsDto){
        const newProduct= await new this.productsModel(productDto);
        return newProduct.save();
    }

    getAll(){
        return this.productsModel.find();
    }

    async getProduct(productName:string){
        const theProduct = await this.productsModel.findOne({productName});
        return theProduct;
    }

    async updateProduct(productName:string,productDto:ProductsDto){
        const product = await this.productsModel.findOne({productName})
        if(!product){
            throw new HttpException('The product not Found',404);
        }
        const updatedProduct = await this.productsModel.findOneAndUpdate({productName},productDto,{returnDocument:'after'})
        return updatedProduct;
    }
    
    async deleteProduct(productName:string){
        const product = await this.productsModel.findOneAndDelete({productName});
        if(!product){
            throw new HttpException("Product Not found",404);
        }
        return product;
    }
}
