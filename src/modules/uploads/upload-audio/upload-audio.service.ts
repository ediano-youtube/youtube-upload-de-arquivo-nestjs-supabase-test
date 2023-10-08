import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'node:path';
import { randomUUID } from 'node:crypto';

import { SupabaseService } from '../../../libs/supabase/supabase.service';

@Injectable()
export class UploadAudioService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async execute(file: Express.Multer.File) {
    const extname = path.extname(file.originalname);

    if (extname !== '.mp3') {
      throw new HttpException('Arquivo .MP3 invalido', HttpStatus.BAD_REQUEST);
    }

    const data = await this.supabaseService.uploadFile({
      bucketName: 'upload_audio',
      contentType: 'audio/mpeg',
      file: file.buffer,
      fileName: randomUUID() + '_' + file.originalname,
    });

    return data;
  }
}
