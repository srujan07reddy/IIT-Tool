import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  adminCreateUserSchema,
  updateOwnPasswordSchema,
} from '@coaching-ops/validation';
import {
  AdminCreateUserDto,
  UpdateOwnPasswordDto,
  UserRole,
} from '@coaching-ops/types';

import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { GlobalValidationPipe } from '../../common/pipes/validation.pipe';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  async createUserByAdmin(
    @CurrentUser('userId') adminId: string,
    @Body(new GlobalValidationPipe(adminCreateUserSchema as any))
    payload: AdminCreateUserDto,
  ) {
    const user = await this.usersService.createUserByAdmin(adminId, payload);
    return this.usersService.sanitizeUser(user);
  }

  @Patch(':id/admin-reset-password')
  @Roles(UserRole.ADMIN)
  async adminResetPassword(
    @CurrentUser('userId') adminId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body('newPassword') newPassword: string,
  ) {
    const user = await this.usersService.adminResetPassword(adminId, {
      userId: id,
      newPassword,
    });
    return this.usersService.sanitizeUser(user);
  }

  @Patch('me/password')
  async updateOwnPassword(
    @CurrentUser('userId') userId: string,
    @Body(new GlobalValidationPipe(updateOwnPasswordSchema as any))
    payload: UpdateOwnPasswordDto,
  ) {
    const user = await this.usersService.userUpdatePassword(userId, payload);
    return this.usersService.sanitizeUser(user);
  }

  @Get('me')
  async getMyProfile(@CurrentUser('userId') userId: string) {
    return this.usersService.findById(userId);
  }
}
