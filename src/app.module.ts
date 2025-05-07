import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsModule } from './tags/tags.module';
import { MetaOptionsModule } from './meta-options/meta-options.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as process from 'node:process';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import environmentValidation from './config/enviroments.validation';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    UsersModule,
    PostsModule,
    AuthModule,
    TagsModule,
    MetaOptionsModule,
    ConfigModule.forRoot(
      /*Load environment variables from .env file*/
      {
        isGlobal: true,
        envFilePath: !ENV ? '.env' : `.env.${ENV}`,
        load: [appConfig, databaseConfig],
        validationSchema: environmentValidation,
      },
    ),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        //entities: [User, Post, Tag, MetaOption],
        type: 'postgres',
        autoLoadEntities: configService.get('database.autoLoadEntities'),
        synchronize: configService.get('database.synchronize'),
        host: configService.get('database.host'),
        port: +configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.name'),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
