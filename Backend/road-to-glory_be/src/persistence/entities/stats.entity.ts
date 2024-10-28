import { AutoMap } from "@automapper/classes";
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from "bcrypt";

@Entity("stats")
export class Stats{
    @PrimaryGeneratedColumn({type:"int", name:"id"})
    id:number;

    @AutoMap()
    @Column("varchar", { name: "username", unique: true, length: 128 })
    username: string;

    @AutoMap()
    @Column({ type:"int", name: "won" })
    won: number;

    @AutoMap()
    @Column({ type:"int", name: "lost" })
    lost: number;
}