import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Users } from "./users.entitiy";

@Entity("requests")
export class Requests {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 256 })
  name: string;

  @Column({ length: 256 })
  status: string;

  @Column({type:"decimal" , precision:10 , scale:2})
  weight:number

  @Column({type:"decimal", precision:10, scale:2})
  cubicMeters:number

  @Column()
  deadline: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Users, (users) => users.request)
  user: Users;
}
