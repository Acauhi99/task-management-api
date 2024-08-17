import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserTable1723895812624 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    await queryRunner.query(
      `CREATE TABLE "user" (
        id uuid NOT NULL DEFAULT uuid_generate_v4(),
        email varchar(255) NOT NULL,
        password varchar(255) NOT NULL,
        createdAt TIMESTAMP NOT NULL DEFAULT now(),
        updatedAt TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT pk_user_id PRIMARY KEY (id)
      );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS user;`);
  }
}
