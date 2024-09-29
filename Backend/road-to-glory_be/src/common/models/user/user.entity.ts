import { AutoMap } from "@automapper/classes";
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from "bcrypt";

@Entity("iser",{ schema: "road_to_glory"})
export class User{
    @PrimaryGeneratedColumn({type:"int", name:"id"})
    id:number;

    @AutoMap()
    @Column("varchar", { name: "username", unique: true, length: 128 })
    username: string;

    @AutoMap()
    @Column("varchar", { name: "password", length: 128 })
    password: string;
  
    @AutoMap()
    @Column("varchar", { name: "first_name", length: 128 })
    firstName: string;
  
    @AutoMap()
    @Column("varchar", { name: "last_name", length: 128 })
    lastName: string;
  
    @BeforeInsert()
    private hashPassword() {
      this.password = bcrypt.hashSync(this.password, 10);
    }
    
}