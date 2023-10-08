import { Test, TestingModule } from '@nestjs/testing';
import { UploadAudioService } from './upload-audio.service';

describe('UploadAudioService', () => {
  let service: UploadAudioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UploadAudioService],
    }).compile();

    service = module.get<UploadAudioService>(UploadAudioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
