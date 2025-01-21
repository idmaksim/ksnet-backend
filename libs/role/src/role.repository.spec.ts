import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing';
import { RoleRepository } from './role.repository';
import { PrismaService } from '@app/prisma/prisma.service';
import { RoleSearchDto } from './dto/role-search.dto';
import { SortTypes } from '@app/common/constants/sort-types.enum';
import { RoleCreateDto } from './dto/role-create.dto';
import { RoleUpdateDto } from './dto/role-update.dto';

describe('Role Repository', () => {
  let repository: RoleRepository;
  const mockPrismaService = {
    role: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      count: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleRepository,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();
    repository = module.get<RoleRepository>(RoleRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('findOneById', () => {
    const mockRole = { id: '1', name: 'admin' };

    it('should return a role when exists', async () => {
      mockPrismaService.role.findUnique.mockResolvedValue(mockRole);
      const role = await repository.findOneById('1');
      expect(role).toEqual(mockRole);
    });

    it('should return null when role not found', async () => {
      mockPrismaService.role.findUnique.mockResolvedValue(null);
      const role = await repository.findOneById('999');
      expect(role).toBeNull();
    });

    it('should throw error when database fails', async () => {
      mockPrismaService.role.findUnique.mockRejectedValue(
        new Error('DB Error'),
      );
      await expect(repository.findOneById('1')).rejects.toThrow('DB Error');
    });
  });

  describe('search', () => {
    const mockSearchDto: RoleSearchDto = {
      filters: {},
      pagination: { page: 1, count: 10 },
      sorts: { name: SortTypes.ASC },
    };

    const mockRoles = [{ id: '1', name: 'admin' }];

    it('should return an array of roles', async () => {
      mockPrismaService.role.findMany.mockResolvedValue(mockRoles);
      const roles = await repository.search(mockSearchDto);
      expect(roles).toEqual(mockRoles);
    });

    it('should return count of roles', async () => {
      mockPrismaService.role.count.mockResolvedValue(10);
      const count = await repository.count(mockSearchDto);
      expect(count).toEqual(10);
    });
  });

  describe('existsById', () => {
    const mockRole = { id: '1', name: 'admin' };

    it('should return true when role exists', async () => {
      mockPrismaService.role.findFirst.mockResolvedValue(mockRole);
      const exists = await repository.existsById('1');
      expect(exists).toBe(true);
    });

    it('should return false when role does not exist', async () => {
      mockPrismaService.role.findFirst.mockResolvedValue(null);
      const exists = await repository.existsById('999');
      expect(exists).toBe(false);
    });
  });

  describe('create', () => {
    const mockRole: RoleCreateDto = {
      name: 'admin',
      permissions: ['1', '2'],
    };

    it('should create a role', async () => {
      mockPrismaService.role.create.mockResolvedValue({
        id: '1',
        ...mockRole,
      });
      const role = await repository.create(mockRole);
      expect(role).toEqual({ id: '1', ...mockRole });
    });
  });

  describe('update', () => {
    const mockRole: RoleUpdateDto = {
      name: 'admin',
      permissions: ['1', '2'],
    };

    it('should update a role', async () => {
      mockPrismaService.role.update.mockResolvedValue({
        id: '1',
        ...mockRole,
      });
      const role = await repository.update({ id: '1', dto: mockRole });
      expect(role).toEqual({ id: '1', ...mockRole });
    });

    it('should return null when role not found', async () => {
      mockPrismaService.role.update.mockResolvedValue(null);
      const role = await repository.update({ id: '999', dto: mockRole });
      expect(role).toBeNull();
    });
  });

  describe('delete', () => {
    it('should delete a role', async () => {
      mockPrismaService.role.delete.mockResolvedValue({ id: '1' });
      const role = await repository.delete('1');
      expect(role).toEqual({ id: '1' });
    });

    it('should return null when role not found', async () => {
      mockPrismaService.role.delete.mockResolvedValue(null);
      const role = await repository.delete('999');
      expect(role).toBeNull();
    });
  });

  describe('existsByName', () => {
    it('should return true when role exists', async () => {
      mockPrismaService.role.findFirst.mockResolvedValue({ id: '1' });
      const exists = await repository.existsByName('admin');
      expect(exists).toBe(true);
    });

    it('should return false when role does not exist', async () => {
      mockPrismaService.role.findFirst.mockResolvedValue(null);
      const exists = await repository.existsByName('admin');
      expect(exists).toBe(false);
    });
  });
});
