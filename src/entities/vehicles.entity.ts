import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "./company.entity";

@Entity("vehicles")
export class Vehicles {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  sign: string;

  @Column()
  type: string;

  @ManyToOne(() => Company, (company) => company.vehicles)
  companyWorkPlace: Company;
}
