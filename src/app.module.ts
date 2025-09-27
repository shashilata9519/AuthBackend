import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import * as dotenv from 'dotenv';

dotenv.config();


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
       host: "sql5.freesqldatabase.com",
      port: 3306,
      username: "sql5800311",
      password: "uia3zNggQ7",
      database: "sql5800311",
      entities: [User],

    }),
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}

