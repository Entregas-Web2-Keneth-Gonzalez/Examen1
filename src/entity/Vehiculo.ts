import { IsDate, IsNotEmpty, IsNumber, MaxLength } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Tipo_Vehiculo } from "./Tipo_Vehiculo";
import { Marca } from "./Marca";
import { Color } from "./Color";

@Entity()
export class Vehiculo{
    @PrimaryGeneratedColumn()
    @IsNotEmpty({message:'Debe indicar el ID.'})  
    id:number;

    @Column({length:10,nullable:false})
    @MaxLength(50,{message:'Debe contener un máximo de 10 caracteres.'})
    @IsNotEmpty({message:'Debe indicar el nombre del producto.'})
    placa: string;

    @Column()
    @IsNotEmpty({message:'Debe indicar el cilindraje del vehiculo.'}) 
    @IsNumber()
    cilindraje: number;

    @Column()
    @IsNotEmpty({message:'Debe indicar la cantidad de pasajeros del vehiculo.'}) 
    @IsNumber()
    pasajeros: number;

    @Column()
    @IsDate({message: "Debe indicar una fecha"})
    fecha_ingreso: Date;

    @Column({default:1})
    estado: boolean;

    @ManyToOne(() => Tipo_Vehiculo, tipo_Vehiculo => tipo_Vehiculo.vehiculo)
    tipo_Vehiculo:Tipo_Vehiculo;

    @ManyToOne(() => Marca, marca => marca.vehiculo)
    marca:Marca;

    @ManyToOne(() => Color, color => color.vehiculo)
    color:Color;
}
