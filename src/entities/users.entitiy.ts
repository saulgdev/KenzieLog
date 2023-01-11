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
import { Requests } from "./requests.entity";

@Entity("users")
export class Users {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 72 })
  name: string;

  @Column({ length: 256 })
  email: string;

  @Column({ length: 65 })
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  isAdm: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Requests, (requests) => requests.user)
  request: Requests[];

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;
}
