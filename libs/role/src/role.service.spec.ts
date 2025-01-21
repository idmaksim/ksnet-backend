import { Test, TestingModule } from '@nestjs/testing';
import { RoleService } from './role.service';
import { RoleRepository } from './role.repository';
import { I18nService } from 'nestjs-i18n';
import { PermissionService } from '@app/permissions';
import { PERMISSION_SERVICE } from '@app/common/constants/providers.const';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { RoleSearchDto } from './dto/role-search.dto';
import { RoleCreateDto } from './dto/role-create.dto';

describe('RoleService', () => {
  let service: RoleService;
  let repository: RoleRepository;
  let permissionService: PermissionService;

  const mockRoleRepository = {
    delete: jest.fn(),
    search: jest.fn(),
    count: jest.fn(),
    update: jest.fn(),
    create: jest.fn(),
    findOneById: jest.fn(),
    existsById: jest.fn(),
    existsByName: jest.fn(),
  };

  const mockI18nService = {
    t: jest.fn().mockImplementation((key) => key),
  };

  const mockPermissionService = {
    ensureExistsById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleService,
        {
          provide: RoleRepository,
          useValue: mockRoleRepository,
        },
        {
          provide: I18nService,
          useValue: mockI18nService,
        },
        {
          provide: PERMISSION_SERVICE,
          useValue: mockPermissionService,
        },
      ],
    }).compile();

    service = module.get<RoleService>(RoleService);
    repository = module.get<RoleRepository>(RoleRepository);
    permissionService = module.get<PermissionService>(PERMISSION_SERVICE);
  });

  describe('create', () => {
    const createDto: RoleCreateDto = {
      name: 'test-role',
      permissions: ['1', '2'],
    };

    it('should create a role successfully', async () => {
      mockRoleRepository.existsByName.mockResolvedValue(false);
      mockRoleRepository.create.mockResolvedValue({ id: '1', ...createDto });
      mockPermissionService.ensureExistsById.mockResolvedValue(true);

      const result = await service.create(createDto);

      expect(result).toEqual({ id: '1', ...createDto });
      expect(mockRoleRepository.create).toHaveBeenCalledWith(createDto);
    });

    it('should throw ConflictException if role already exists', async () => {
      mockRoleRepository.existsByName.mockResolvedValue(true);

      await expect(service.create(createDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('findOneById', () => {
    it('should find a role by id', async () => {
      const role = { id: '1', name: 'test' };
      mockRoleRepository.findOneById.mockResolvedValue(role);

      const result = await service.findOneById('1');

      expect(result).toEqual(role);
      expect(mockRoleRepository.findOneById).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException if role not found', async () => {
      mockRoleRepository.findOneById.mockResolvedValue(null);

      await expect(service.findOneById('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should delete a role successfully', async () => {
      mockRoleRepository.existsById.mockResolvedValue(true);
      mockRoleRepository.delete.mockResolvedValue({ id: '1' });

      const result = await service.delete('1');

      expect(result).toEqual({ id: '1' });
      expect(mockRoleRepository.delete).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException if role not found', async () => {
      mockRoleRepository.existsById.mockResolvedValue(false);

      await expect(service.delete('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('search', () => {
    const searchDto: RoleSearchDto = { pagination: { page: 1, count: 10 } };

    it('should return search results', async () => {
      const roles = [{ id: '1', name: 'test' }];
      mockRoleRepository.search.mockResolvedValue(roles);
      mockRoleRepository.count.mockResolvedValue(1);

      const result = await service.search(searchDto);

      expect(result).toEqual({ data: roles, count: 1 });
      expect(mockRoleRepository.search).toHaveBeenCalledWith(searchDto);
      expect(mockRoleRepository.count).toHaveBeenCalledWith(searchDto);
    });
  });
});
