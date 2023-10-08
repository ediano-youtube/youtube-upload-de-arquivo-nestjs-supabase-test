import { Module } from '@nestjs/common';
import { UploadAudioModule } from './upload-audio/upload-audio.module';

@Module({
  imports: [UploadAudioModule]
})
export class UploadsModule {}
