import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './schema/users.schema';
import { UserService } from './users.service';
import { UsersResolver } from './users.resolver';

@Module({
    imports: [MongooseModule.forFeature([{name: 'user', schema: userSchema}])],
    providers: [UserService, UsersResolver]
})
export class UsersModule {}
