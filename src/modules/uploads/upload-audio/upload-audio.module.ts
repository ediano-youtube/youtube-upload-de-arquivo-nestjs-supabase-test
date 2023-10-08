import { Module } from '@nestjs/common';
import { UploadAudioController } from './upload-audio.controller';
import { UploadAudioService } from './upload-audio.service';

@Module({
  controllers: [UploadAudioController],
  providers: [UploadAudioService],
})
export class UploadAudioModule {}
