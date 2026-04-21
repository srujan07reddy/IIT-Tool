import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  AdminCreateUserDto,
  UpdateOwnPasswordDto,
  UserRole,
  type AdminResetPasswordDto,
} from '@coaching-ops/types';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { UserEntity } from '../auth/entities/user.entity';
import { AuthService } from '../auth/auth.service';

const ADMIN_MANAGED_ROLES = [
  UserRole.STAFF,
  UserRole.TECHNICIAN,
  UserRole.ACCOUNT,
];

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findByEmailForAuth(email: string): Promise<UserEntity | null> {
    return this.usersRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();
  }

  async findById(id: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async createUserByAdmin(adminId: string, payload: AdminCreateUserDto): Promise<UserEntity> {
    if (!ADMIN_MANAGED_ROLES.includes(payload.role)) {
      throw new ConflictException('Admin can only create STAFF, TECHNICIAN, or ACCOUNT users');
    }

    const existingUser = await this.findByEmail(payload.email);
    if (existingUser) {
      throw new ConflictException('A user with this email already exists');
    }

    const hashedPassword = await this.authService.hashPassword(payload.password);

    const user = this.usersRepository.create({
      email: payload.email,
      firstName: payload.firstName,
      lastName: payload.lastName,
      role: payload.role,
      password: hashedPassword,
      createdBy: adminId,
      passwordLastChangedAt: new Date(),
      isActive: payload.isActive ?? true,
    });

    return this.usersRepository.save(user);
  }

  async adminResetPassword(adminId: string, payload: AdminResetPasswordDto): Promise<UserEntity> {
    await this.findById(adminId);
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.id = :id', { id: payload.userId })
      .getOne();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.password = await this.authService.hashPassword(payload.newPassword);
    user.passwordLastChangedAt = new Date();
    user.createdBy = user.createdBy ?? adminId;
    return this.usersRepository.save(user);
  }

  async userUpdatePassword(userId: string, payload: UpdateOwnPasswordDto): Promise<UserEntity> {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.id = :userId', { userId })
      .getOne();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const passwordMatches = await bcrypt.compare(payload.currentPassword, user.password);
    if (!passwordMatches) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    user.password = await this.authService.hashPassword(payload.newPassword);
    user.passwordLastChangedAt = new Date();
    return this.usersRepository.save(user);
  }

  async markLastLogin(userId: string): Promise<void> {
    await this.usersRepository.update(userId, { lastLoginAt: new Date() });
  }

  sanitizeUser(user: UserEntity) {
    const { password, ...safeUser } = user as UserEntity & { password?: string };
    return safeUser;
  }
}
