import { ExecutionContext, CallHandler, HttpException } from '@nestjs/common';
import { UploadAduioInterceptor } from './upload-aduio.interceptor';

describe('UploadAduioInterceptor', () => {
  it('should be defined', () => {
    expect(new UploadAduioInterceptor()).toBeDefined();
  });

  it('Arquivo não enviado', () => {
    const uploadAduioInterceptor = new UploadAduioInterceptor();

    const context = {
      switchToHttp: () => {
        return {
          getRequest: () => {
            return {};
          },
        };
      },
    } as ExecutionContext;

    const next = { handle: jest.fn() };

    try {
      uploadAduioInterceptor.intercept(context, next as CallHandler);
      throw new Error('Not throw');
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toBe('Arquivo não enviado');
      expect(error.status).toBe(400);
    }

    expect(new UploadAduioInterceptor()).toBeDefined();
    expect(next.handle).toBeCalledTimes(0);
  });

  it('Arquivo de audio invalido', () => {
    const uploadAduioInterceptor = new UploadAduioInterceptor();

    const context = {
      switchToHttp: () => {
        return {
          getRequest: () => {
            return {
              file: {
                mimetype: 'NOT/SUPPORTED',
                size: 1_848_576 * 5 /* 5mb */,
              },
            };
          },
        };
      },
    } as ExecutionContext;

    const next = { handle: jest.fn() };

    try {
      uploadAduioInterceptor.intercept(context, next as CallHandler);
      throw new Error('Not throw');
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toBe('Arquivo de audio invalido');
      expect(error.status).toBe(400);
    }

    expect(new UploadAduioInterceptor()).toBeDefined();
    expect(next.handle).toBeCalledTimes(0);
  });

  it('Arquivo maior que o suportado (5mb)', () => {
    const uploadAduioInterceptor = new UploadAduioInterceptor();

    const context = {
      switchToHttp: () => {
        return {
          getRequest: () => {
            return {
              file: {
                mimetype: 'audio/mpeg',
                size: 1_848_576 * 5 + 1 /* 5mb */,
              },
            };
          },
        };
      },
    } as ExecutionContext;

    const next = { handle: jest.fn() };

    try {
      uploadAduioInterceptor.intercept(context, next as CallHandler);
      throw new Error('Not throw');
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toBe('Arquivo maior que o suportado (5mb)');
      expect(error.status).toBe(400);
    }

    expect(new UploadAduioInterceptor()).toBeDefined();
    expect(next.handle).toBeCalledTimes(0);
  });

  it('OK', () => {
    const uploadAduioInterceptor = new UploadAduioInterceptor();

    const context = {
      switchToHttp: () => {
        return {
          getRequest: () => {
            return {
              file: {
                mimetype: 'audio/mpeg',
                size: 1_848_576 * 5 /* 5mb */,
              },
            };
          },
        };
      },
    } as ExecutionContext;

    const next = { handle: jest.fn() };

    uploadAduioInterceptor.intercept(context, next as CallHandler);

    expect(new UploadAduioInterceptor()).toBeDefined();
    expect(next.handle).toBeCalledTimes(1);
  });
});
