import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DataResponseInterceptor implements NestInterceptor {
  constructor(
    /*@Inject(AppConfig.KEY)
    private readonly appConfiguration: ConfigType<typeof AppConfig>,*/
    private readonly configService: ConfigService,
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before handling the request');
    return next.handle().pipe(
      map((data) => ({
        status: 'success',
        //version: this.appConfiguration.apiVersion,
        apiVersion: this.configService.get('appConfig.apiVersion'),
        data: data,
      })),
    );
  }
}
