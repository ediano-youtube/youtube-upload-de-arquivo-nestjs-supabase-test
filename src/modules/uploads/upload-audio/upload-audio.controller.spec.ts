import { Test, TestingModule } from '@nestjs/testing';
import { UploadAudioController } from './upload-audio.controller';

describe('UploadAudioController', () => {
  let controller: UploadAudioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UploadAudioController],
    }).compile();

    controller = module.get<UploadAudioController>(UploadAudioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
