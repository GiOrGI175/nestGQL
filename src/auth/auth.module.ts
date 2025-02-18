import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    JwtModule.register({
      secret: 'your-jwt-secret',
      signOptions: { expiresIn: '1h' },
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      playground: true,
    }),
    UsersModule,
  ],
  providers: [AuthService],
})
export class AppModule {}
