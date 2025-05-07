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
      },
    ),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        //entities: [User, Post, Tag, MetaOption],
        synchronize: true,
        autoLoadEntities: true,
        type: 'postgres',
        host: configService.get('DATABASE_HOST') ?? '',
        port: +configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME') ?? '',
        password: configService.get('DATABASE_PASSWORD') ?? '',
        database: configService.get('DATABASE_NAME') ?? '',
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
