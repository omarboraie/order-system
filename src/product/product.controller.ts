import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductsDto } from './dto/products.dto';

@Controller('product')
export class ProductController {
    constructor(private readonly productService:ProductService){}

    @Post()
    @UsePipes(new ValidationPipe())
    async addProduct(@Body() productsDto:ProductsDto){
        const newProduct = this.productService.addProduct(productsDto);
        return newProduct;
    }

    @Get()
    getAll(){
        return this.productService.getAll();
    }
    @Get(':name')
    async getProduct(@Param('productName') productName:string){
        const theProduct = await this.productService.getProduct(productName);
        return theProduct;
    }

    @Patch(':productName')
    @UsePipes(new ValidationPipe())
    async updateProduct(@Param("productName") productName:string,@Body() productDto:ProductsDto){
        const updatedProduct = await this.productService.updateProduct(productName,productDto)
        return updatedProduct;
    }

    @Delete("productName")
    async deleteProduct(@Param("productName") productName:string){
        return this.productService.deleteProduct(productName);
    }
}
