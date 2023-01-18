import { MigrationInterface, QueryRunner } from "typeorm";

export class newTables1674045064682 implements MigrationInterface {
    name = 'newTables1674045064682'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contact" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "phoneNumber" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "PK_2cbbe00f59ab6b3bb5b8d19f989" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vehicles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "sign" character varying NOT NULL, "type" character varying NOT NULL, "companyWorkPlaceId" uuid, CONSTRAINT "PK_18d8646b59304dce4af3a9e35b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "company" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "openingTime" character varying NOT NULL, "cnpj" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "addressId" uuid, "contactsId" uuid, CONSTRAINT "REL_3737905699894299444476dd79" UNIQUE ("addressId"), CONSTRAINT "REL_920973e9ac83593fcc5da87dac" UNIQUE ("contactsId"), CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "requests" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "requests" ADD "status" character varying NOT NULL DEFAULT 'pending'`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD CONSTRAINT "FK_f3016a2dbd0ebabfa239123da2c" FOREIGN KEY ("companyWorkPlaceId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_3737905699894299444476dd79c" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_920973e9ac83593fcc5da87dac2" FOREIGN KEY ("contactsId") REFERENCES "contact"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_920973e9ac83593fcc5da87dac2"`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_3737905699894299444476dd79c"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP CONSTRAINT "FK_f3016a2dbd0ebabfa239123da2c"`);
        await queryRunner.query(`ALTER TABLE "requests" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "requests" ADD "status" character varying(256) NOT NULL`);
        await queryRunner.query(`DROP TABLE "company"`);
        await queryRunner.query(`DROP TABLE "vehicles"`);
        await queryRunner.query(`DROP TABLE "contact"`);
    }

}
