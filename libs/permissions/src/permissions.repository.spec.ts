import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing';
import { PermissionRepository } from './permissions.repository';
import { PrismaService } from '@app/prisma/prisma.service';
import { PermissionSearchDto } from './dto/permission-search.dto';
import { SortTypes } from '@app/common/constants/sort-types.enum';
import exp from 'constants';

describe('PermissionsRepository', () => {
  let repository: PermissionRepository;
  const mockPrismaService = {
    permission: {
      findMany: jest.fn(),
      count: jest.fn(),
      findUnique: jest.fn(),
    },
  };
  const requestDto: PermissionSearchDto = {
    pagination: { page: 1, count: 10 },
    sorts: { title: SortTypes.DESC },
    filters: { title: 'test' },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PermissionRepository,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    repository = module.get<PermissionRepository>(PermissionRepository);
  });

  describe('search', () => {
    it('should return all permissions', async () => {
      mockPrismaService.permission.findMany.mockResolvedValue([
        { id: '1', name: 'test', createdAt: new Date(), updatedAt: new Date() },
      ]);

      const permissions = await repository.search(requestDto);
      expect(permissions).toBeDefined();
      expect(permissions).toHaveLength(1);
      expect(permissions[0].id).toBe('1');
      expect(permissions[0].name).toBe('test');
    });

    it('should return empty array when no permissions are found', async () => {
      mockPrismaService.permission.findMany.mockResolvedValue([]);

      const permissions = await repository.search(requestDto);
      expect(permissions).toBeDefined();
      expect(permissions).toHaveLength(0);
    });
  });

  describe('count', () => {
    it('should return the count of permissions', async () => {
      mockPrismaService.permission.count.mockResolvedValue(1);

      const count = await repository.count(requestDto);
      expect(count).toBe(1);
    });
  });

  describe('existsById', () => {
    it('should return true if permission exists', async () => {
      mockPrismaService.permission.findUnique.mockResolvedValue({
        id: '1',
        name: 'test',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const exists = await repository.existsById('1');
      expect(exists).toBe(true);
    });

    it('should return false if permission does not exist', async () => {
      mockPrismaService.permission.findUnique.mockResolvedValue(null);

      const exists = await repository.existsById('2');
      expect(exists).toBe(false);
    });
  });
});
