import { IsNotEmpty, MaxLength } from "class-validator";
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Vehiculo } from "./Vehiculo";

@Entity()
export class Tipo_Vehiculo {
    @PrimaryColumn()
    @IsNotEmpty({message:'Debe indicar el ID.'})  
    id:number;

    @Column({length:50,nullable:false})
    @MaxLength(50,{message:'Debe contener un máximo de 50 caracteres.'})
    @IsNotEmpty({message:'Debe indicar el nombre del tipo de vehiculo.'})
    nombre: string;

    @Column({default:1})
    estado: boolean;

    @OneToMany(() => Vehiculo, vehiculo => vehiculo.tipo_Vehiculo)
    vehiculo: Vehiculo[];
}