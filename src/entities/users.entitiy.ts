import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
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
}
