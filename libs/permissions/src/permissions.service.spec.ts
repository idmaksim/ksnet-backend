import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing';
import { PermissionService } from './permissions.service';
import { PermissionRepository } from './permissions.repository';
import { I18nService } from 'nestjs-i18n';
import { NotFoundException } from '@nestjs/common';
import { PermissionSearchDto } from './dto/permission-search.dto';

describe('PermissionsService', () => {
  let service: PermissionService;
  const mockPermissionRepository = {
    findManyByRoleId: jest.fn(),
    existsById: jest.fn(),
    existsMany: jest.fn(),
    findOneById: jest.fn(),
    search: jest.fn(),
    count: jest.fn(),
  };
  const i18nService = {
    t: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PermissionService,
        {
          provide: PermissionRepository,
          useValue: mockPermissionRepository,
        },
        {
          provide: I18nService,
          useValue: i18nService,
        },
      ],
    }).compile();

    service = module.get<PermissionService>(PermissionService);
  });

  describe('checkPermission', () => {
    it('should return true if permission exists', async () => {
      mockPermissionRepository.findManyByRoleId.mockResolvedValue([
        { id: '1', name: 'test' },
      ]);

      const result = await service.checkPermission({
        roleId: '1',
        permission: 'test',
      });

      expect(result).toBe(true);
    });

    it('should return false if permission does not exist', async () => {
      mockPermissionRepository.findManyByRoleId.mockResolvedValue([]);

      const result = await service.checkPermission({
        roleId: '1',
        permission: 'test',
      });

      expect(result).toBe(false);
    });
  });

  describe('ensureExistsById', () => {
    it('should throw NotFoundException if permission does not exist', async () => {
      mockPermissionRepository.existsById.mockResolvedValue(false);

      await expect(service.ensureExistsById('1')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should be undefined if it exists', async () => {
      mockPermissionRepository.existsById.mockResolvedValue(true);

      const result = await service.ensureExistsById('1');
      expect(result).toBeUndefined();
    });
  });

  describe('findOneById', () => {
    it('should throw NotFoundException if permission does not exist', async () => {
      mockPermissionRepository.findOneById.mockResolvedValue(null);

      await expect(service.findOneById('1')).rejects.toThrow(NotFoundException);
    });

    it('should return permission if it exists', async () => {
      mockPermissionRepository.findOneById.mockResolvedValue({
        id: '1',
        name: 'test',
      });

      const result = await service.findOneById('1');
      expect(result).toEqual({ id: '1', name: 'test' });
    });
  });

  describe('search', () => {
    it('should return permissions', async () => {
      mockPermissionRepository.search.mockResolvedValue([
        { id: '1', name: 'test' },
      ]);
      mockPermissionRepository.count.mockResolvedValue(1);

      const requestDto: PermissionSearchDto = {
        pagination: { page: 1, count: 10 },
        filters: {},
      };

      const result = await service.search(requestDto);
      expect(result).toEqual({
        data: [{ id: '1', name: 'test' }],
        count: 1,
      });
    });
  });
});
