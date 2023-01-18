import { MigrationInterface, QueryRunner } from "typeorm";

export class newContraist1674060653403 implements MigrationInterface {
    name = 'newContraist1674060653403'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicles" DROP CONSTRAINT "FK_f3016a2dbd0ebabfa239123da2c"`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD CONSTRAINT "FK_f3016a2dbd0ebabfa239123da2c" FOREIGN KEY ("companyWorkPlaceId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicles" DROP CONSTRAINT "FK_f3016a2dbd0ebabfa239123da2c"`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD CONSTRAINT "FK_f3016a2dbd0ebabfa239123da2c" FOREIGN KEY ("companyWorkPlaceId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
