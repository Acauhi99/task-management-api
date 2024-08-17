import { MigrationInterface, QueryRunner } from 'typeorm';

export class TaskTable1723895804824 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    await queryRunner.query(
      `CREATE TABLE "task" (
        id uuid NOT NULL DEFAULT uuid_generate_v4(),
        title varchar(255) NOT NULL,
        description varchar(500) NULL,
        status varchar(50) NOT NULL DEFAULT 'OPEN',
        expiration_date TIMESTAMP NOT NULL,
        createdAt TIMESTAMP NOT NULL DEFAULT now(),
        updatedAt TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT pk_task_id PRIMARY KEY (id)
      );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS task;`);
  }
}
