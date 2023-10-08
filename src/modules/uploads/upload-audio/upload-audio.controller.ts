import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { UploadAudioService } from './upload-audio.service';
import { UploadAduioInterceptor } from '../../../core/interceptor/upload-aduio/upload-aduio.interceptor';

@Controller({ path: '/uploads/audio' })
export class UploadAudioController {
  constructor(private readonly uploadAudioService: UploadAudioService) {}

  @Post()
  @UseInterceptors(UploadAduioInterceptor)
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File) {
    return this.uploadAudioService.execute(file);
  }
}
