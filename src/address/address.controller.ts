import { Body, Controller, Post,Get,UsePipes,ValidationPipe, Param , HttpException,Delete, Patch} from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressDto } from './dto/address.dto';
import { CreateUserDto } from 'src/users/dto/CreateUser.dto';

@Controller('address')
export class AddressController {
    constructor(private readonly addressService: AddressService ,) {}

    @Post()
    @UsePipes(new ValidationPipe())
        createAddress(@Body() AddressDto: AddressDto) {
            const user = this.addressService.createAddress(AddressDto);
            return user;
        }

    @Get()
        getAllUsers() {
            return this.addressService.getAll();
        }
    
    @Get('user/:username')
    findByUsername(@Param('username') username: string) {
        const user=username;
        if(!user) {
                    throw new HttpException(`User with username ${username} not found`, 404);
                }
        return this.addressService.getAllAddressesForUser(username);
    }

    @Delete(':id')
    async deleteAddress(@Param('id') id:string){
        const deletedAddress = await this.addressService.deleteAddress(id);
        if(!deletedAddress) {
            throw new HttpException(`Address ${deletedAddress} not found`, 404);
        }
        return deletedAddress;
    }

    @Patch(':id')
    @UsePipes(new ValidationPipe())
    async updateAddress(@Param('id') id:string,@Body() addressDto:AddressDto){
        const updatedAddress = await this.addressService.updateAddress(id,addressDto)
        if(!updatedAddress){
            throw new HttpException(`Address Not Found`,404);
        }
        return updatedAddress;
    }
}
