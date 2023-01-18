import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("contact")
export class Contact {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  phoneNumber: string;

  @Column()
  email: string;
}
