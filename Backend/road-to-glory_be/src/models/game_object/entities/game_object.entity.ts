import { Column, PrimaryGeneratedColumn } from "typeorm";

export class GameObject {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:"varchar",unique:false, length: 128})
    type:string;

    @Column({type:"double precision"})
    health:number;

    @Column({type:"integer"})
    x_coordinate: number;
    
    @Column({type:"integer"})
    y_coordinate:number

    @Column({type:"varchar", length: 128})
    image:string;

    //proizvodi i queue fali
}
