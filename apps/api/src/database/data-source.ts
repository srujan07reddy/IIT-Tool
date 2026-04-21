import 'reflect-metadata';
import { DataSource } from 'typeorm';

import databaseConfig from '../config/database.config';
import { BatchEntity } from '../modules/academics/entities/batch.entity';
import { ChapterEntity } from '../modules/academics/entities/chapter.entity';
import { SubjectEntity } from '../modules/academics/entities/subject.entity';
import { TopicEntity } from '../modules/academics/entities/topic.entity';
import { UserEntity } from '../modules/auth/entities/user.entity';
import { ContextCardEntity } from '../modules/context-cards/entities/context-card.entity';
import { ParentEntity } from '../modules/students/entities/parent.entity';
import { StudentEntity } from '../modules/students/entities/student.entity';
import { RoleEntity } from '../modules/users/entities/role.entity';

const db = databaseConfig();

export default new DataSource({
  type: 'postgres',
  host: db.host,
  port: db.port,
  username: db.username,
  password: db.password,
  database: db.database,
  synchronize: db.synchronize,
  logging: db.logging,
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
});
