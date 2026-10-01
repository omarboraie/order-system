import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import {MongooseModule} from "@nestjs/mongoose";
import { AddressModule } from './address/address.module';
import { ProductModule } from './product/product.module';
@Module({
  imports: [UsersModule, OrdersModule,ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
    }),
    UsersModule,
    OrdersModule,
    AddressModule,
    ProductModule,],
  controllers: [AppController,],
  providers: [AppService,],
})
export class AppModule {}
