import { MigrationInterface, QueryRunner } from "typeorm";

export class addNewColumnRequest1673615214484 implements MigrationInterface {
    name = 'addNewColumnRequest1673615214484'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "requests" ADD "weight" numeric(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "requests" ADD "cubicMeters" numeric(10,2) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "requests" DROP COLUMN "cubicMeters"`);
        await queryRunner.query(`ALTER TABLE "requests" DROP COLUMN "weight"`);
    }

}
