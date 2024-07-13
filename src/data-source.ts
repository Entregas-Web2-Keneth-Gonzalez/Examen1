import "reflect-metadata"
import { DataSource } from "typeorm"
import { Color } from "./entity/Color"
import { Marca } from "./entity/Marca"
import { Tipo_Vehiculo } from "./entity/Tipo_Vehiculo"
import { Vehiculo } from "./entity/Vehiculo"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "Utn123**",
    database: "bdExamen",
    synchronize: true,
    logging: false,
    entities: [Color, Marca, Tipo_Vehiculo, Vehiculo],
    migrations: [],
    subscribers: [],
})