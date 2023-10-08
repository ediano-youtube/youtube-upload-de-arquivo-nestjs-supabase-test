import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

export const fileSize = 1_848_576 * 5; // 5mb

@Injectable()
export class UploadAduioInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    if (!request.file) {
      throw new HttpException('Arquivo não enviado', HttpStatus.BAD_REQUEST);
    }

    const file: Express.Multer.File = request.file;

    if (file.mimetype !== 'audio/mpeg') {
      throw new HttpException(
        'Arquivo de audio invalido',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (file.size > fileSize) {
      throw new HttpException(
        'Arquivo maior que o suportado (5mb)',
        HttpStatus.BAD_REQUEST,
      );
    }

    return next.handle();
  }
}
