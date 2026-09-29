import { HttpException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from 'node_modules/@nestjs/mongoose/dist/common/mongoose.decorators';
import { Address } from 'src/schemas/Address.schema';
import { AddressDto } from './dto/address.dto';
import { User } from 'src/schemas/Users.schema';

@Injectable()
export class AddressService {
    constructor (@InjectModel(Address.name) private readonly addressModel:Model<Address>,@InjectModel(User.name) private readonly userModel:Model<User>){}

    async createAddress(createAddressDto: AddressDto) {
    const user = await this.userModel.findOne({
      username: createAddressDto.username,
    });
    if(!user) {
            throw new HttpException(`User with username ${createAddressDto.username} not found`, 404);
        }
    return this.addressModel.create(createAddressDto);
  }

    getAll() {
        return this.addressModel.find();
    }

    async getAllAddressesForUser(username: string) {
        const user = await this.userModel.findOne({ username });
        return this.addressModel.find({ username });
    }

    async deleteAddress(_id: string) {
        const deletedAddress = await  this.addressModel.findOneAndDelete({ _id });
        return deletedAddress;
    }

    async updateAddress(_id:string,addressDto:AddressDto){
        const user = await this.userModel.findOne({username:addressDto.username});
        if(!user){
            throw new HttpException(`User not Found`,404);
        }
        const updatedAddress = await this.addressModel.findOneAndUpdate({ _id },addressDto,{returnDocument: 'after'});
        return updatedAddress;
    }
}
