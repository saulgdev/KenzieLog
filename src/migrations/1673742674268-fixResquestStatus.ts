import { MigrationInterface, QueryRunner } from "typeorm";

export class fixResquestStatus1673742674268 implements MigrationInterface {
    name = 'fixResquestStatus1673742674268'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "requests" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "requests" ADD "status" character varying NOT NULL DEFAULT 'pending'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "requests" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "requests" ADD "status" character varying(256) NOT NULL`);
    }

}
