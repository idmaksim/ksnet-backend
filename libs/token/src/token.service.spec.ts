import { Test, TestingModule } from '@nestjs/testing';
import { TokenService } from './token.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';

describe('Token Service', () => {
  let service: TokenService;
  let jwtService: JwtService;

  const mockJwtService = {
    sign: jest.fn(),
    verify: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn().mockImplementation((key: string) => {
      switch (key) {
        case 'ACCESS_SECRET':
          return 'test-secret';
        case 'REFRESH_SECRET':
          return 'test-refresh-secret';
        default:
          return undefined;
      }
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TokenService,
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<TokenService>(TokenService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('generate access token', () => {
    it('should generate access token', async () => {
      const id = '1';
      const expectedToken = 'access-token';
      mockJwtService.sign.mockReturnValue(expectedToken);

      const result = await service.generateAccessToken(id);

      expect(result).toBe(expectedToken);
      expect(mockJwtService.sign).toHaveBeenCalledWith({ id });
    });
  });

  describe('generate refresh token', () => {
    it('should generate refresh token', async () => {
      const id = '1';
      const expectedToken = 'refresh-token';
      mockJwtService.sign.mockReturnValue(expectedToken);

      const result = await service.generateRefreshToken(id);

      expect(result).toBe(expectedToken);
      expect(mockJwtService.sign).toHaveBeenCalledWith(
        { id },
        {
          secret: 'test-refresh-secret',
          expiresIn: '7d',
        },
      );
    });
  });

  describe('verify refresh token', () => {
    it('should verify valid refresh token', async () => {
      const token = 'valid-token';
      const payload = { id: '1' };
      mockJwtService.verify.mockReturnValue(payload);

      const result = await service.verifyRefreshToken(token);

      expect(result).toEqual(payload);
      expect(mockJwtService.verify).toHaveBeenCalledWith(token, {
        secret: 'test-refresh-secret',
      });
    });

    it('should throw UnauthorizedException for invalid token', async () => {
      const token = 'invalid-token';
      mockJwtService.verify.mockImplementation(() => {
        throw new Error('Invalid token');
      });

      await expect(service.verifyRefreshToken(token)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
