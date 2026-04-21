import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';

import authConfig from './config/auth.config';
import databaseConfig from './config/database.config';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { RolesGuard } from './common/guards/roles.guard';
import { HealthModule } from './modules/health.module';
import { AcademicsModule } from './modules/academics/academics.module';
import { AuthModule } from './modules/auth/auth.module';
import { ContextCardsModule } from './modules/context-cards/context-cards.module';
import { StudentsModule } from './modules/students/students.module';
import { UsersModule } from './modules/users/users.module';
import { BatchEntity } from './modules/academics/entities/batch.entity';
import { ChapterEntity } from './modules/academics/entities/chapter.entity';
import { SubjectEntity } from './modules/academics/entities/subject.entity';
import { TopicEntity } from './modules/academics/entities/topic.entity';
import { UserEntity } from './modules/auth/entities/user.entity';
import { ContextCardEntity } from './modules/context-cards/entities/context-card.entity';
import { ParentEntity } from './modules/students/entities/parent.entity';
import { StudentEntity } from './modules/students/entities/student.entity';
import { RoleEntity } from './modules/users/entities/role.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        path.resolve(process.cwd(), 'apps/api/.env'),
        path.resolve(process.cwd(), '.env'),
      ],
      load: [authConfig, databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [databaseConfig.KEY],
      useFactory: (db: ConfigType<typeof databaseConfig>) => ({
        type: 'postgres',
        host: db.host,
        port: db.port,
        username: db.username,
        password: db.password,
        database: db.database,
        synchronize: db.synchronize,
        logging: db.logging,
        autoLoadEntities: false,
        entities: [
          UserEntity,
          RoleEntity,
          StudentEntity,
          ParentEntity,
          BatchEntity,
          SubjectEntity,
          ChapterEntity,
          TopicEntity,
          ContextCardEntity,
        ],
      }),
    }),
    AuthModule,
    UsersModule,
    StudentsModule,
    AcademicsModule,
    ContextCardsModule,
    HealthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
