import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UserCreateDto } from './dto/user-create.dto';
import { I18nService } from 'nestjs-i18n';
import { PasswordService } from '@app/password';
import { User, UserWithoutPassword } from '@app/common/types/user';
import {
  FindOneByEmailOptions,
  FindOneByIdOptions,
} from './interfaces/service.interfaces';
import { GroupService } from '@app/group';
import { transliterate } from 'transliteration';
import { UserSearchDto } from './dto/user.search.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly passwordService: PasswordService,
    private readonly groupService: GroupService,
    private readonly i18n: I18nService,
  ) {}

  async search(dto: UserSearchDto) {
    const [data, count] = await Promise.all([
      this.usersRepository.search(dto),
      this.usersRepository.count(dto),
    ]);
    return { data, count };
  }

  async create(dto: UserCreateDto) {
    await this.ensureExistsByEmail(dto.email);
    await this.groupService.ensureExistsById(dto.groupId);

    const username = await this.generateUsername(dto.firstName, dto.lastName);
    const hashedPassword = await this.passwordService.hashPassword(
      dto.password,
    );

    const user = await this.usersRepository.create({
      ...dto,
      username,
      password: hashedPassword,
    });
    return this.deletePassword(user);
  }

  private async generateUsername(firstName: string, lastName: string) {
    const baseUsername = transliterate(
      `${firstName}_${lastName}`,
    ).toLowerCase();
    const randomNum = Math.floor(Math.random() * 900) + 100;
    return `${baseUsername}_${randomNum}`;
  }

  async findOneByEmail(options: FindOneByEmailOptions) {
    const user = await this.usersRepository.findOneByEmail(options.email);
    if (!user) {
      throw new NotFoundException(this.i18n.t('errors.user.notFound'));
    }
    return options.withPassword ? user : this.deletePassword(user);
  }

  async findOneById(options: FindOneByIdOptions) {
    const user = await this.usersRepository.findOneById(options.id);
    if (!user) {
      throw new NotFoundException(this.i18n.t('errors.user.notFound'));
    }
    return options.withPassword ? user : this.deletePassword(user);
  }

  async ensureExistsById(id: string) {
    const exists = await this.usersRepository.existsById(id);
    if (!exists) {
      throw new NotFoundException(this.i18n.t('errors.user.notFound'));
    }
  }

  async ensureExistsByEmail(email: string) {
    const exists = await this.usersRepository.existsByEmail(email);
    if (exists) {
      throw new ConflictException(
        this.i18n.translate('errors.user.alreadyExists'),
      );
    }
  }

  private async deletePassword(user: User): Promise<UserWithoutPassword> {
    delete user.password;
    return user;
  }
}
