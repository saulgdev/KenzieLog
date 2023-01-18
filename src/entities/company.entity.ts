import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Address } from "./address.entity";
import { Contact } from "./contact.entity";
import { Vehicles } from "./vehicles.entity";

@Entity("company")
export class Company {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  openingTime: string;

  @Column()
  cnpj: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;

  @OneToMany(() => Vehicles, (vehicles) => vehicles.companyWorkPlace)
  vehicles: Vehicles[];

  @OneToOne(() => Contact)
  @JoinColumn()
  contacts: Contact;
}
