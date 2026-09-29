import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { Address, AddressSchema } from 'src/schemas/Address.schema';
import { MongooseModule } from 'node_modules/@nestjs/mongoose/dist/mongoose.module';
import { User,UserSchema } from 'src/schemas/Users.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Address.name, schema: AddressSchema},{name:User.name , schema:UserSchema}])],
  controllers: [AddressController],
  providers: [AddressService]
})
export class AddressModule {}
