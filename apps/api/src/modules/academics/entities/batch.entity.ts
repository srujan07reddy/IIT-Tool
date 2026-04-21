import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from '../../../common/entities/base.entity';
import { StudentEntity } from '../../students/entities/student.entity';
import { SubjectEntity } from './subject.entity';

@Entity('batches')
export class BatchEntity extends BaseEntity {
  @Column({ unique: true })
  code: string;

  @Column()
  name: string;

  @Column()
  courseName: string;

  @Column({ type: 'date', nullable: true })
  startsOn?: Date;

  @Column({ type: 'date', nullable: true })
  endsOn?: Date;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => StudentEntity, (student) => student.batch)
  students: StudentEntity[];

  @OneToMany(() => SubjectEntity, (subject) => subject.batch)
  subjects: SubjectEntity[];
}
