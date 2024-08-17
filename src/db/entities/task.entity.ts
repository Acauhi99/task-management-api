import { TaskStatusEnum } from 'src/task/task.dto';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'task' })
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'varchar' })
  status: TaskStatusEnum;

  @Column({ type: 'timestamp', name: 'expiration_date' })
  expirationDate: Date;
}
