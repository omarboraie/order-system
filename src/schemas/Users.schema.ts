import {Prop, Schema , SchemaFactory} from '@nestjs/mongoose';

@Schema()
export class User{
    @Prop({unique:true,required:true})
    username!: string;
    @Prop({unique:true,required:true})
    email!: string;
    @Prop({required:true})
    password!: string;
    @Prop({type: Boolean,default:false})
    admin!: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);