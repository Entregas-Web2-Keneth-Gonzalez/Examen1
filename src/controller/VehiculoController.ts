import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { validate } from "class-validator";
import { Vehiculo } from "../entity/Vehiculo";
import { Tipo_Vehiculo } from "../entity/Tipo_Vehiculo";
import { Marca } from "../entity/Marca";
import { Color } from "../entity/Color";


class VehiculoController {
    static create = async (req: Request, res: Response) => {
        const repoVehiculo = AppDataSource.getRepository(Vehiculo)
        try {
            const {id, placa, id_marca, id_color, cilindraje, id_TipoVehiculo, cantidadPasajeros, fecha_ingreso} = req.body;

            let idbd = await repoVehiculo.findOne({where:{id}});
            let placabd = await repoVehiculo.findOne({where:{placa}});
            if(idbd && placabd){
                res.status(400).json({message:`Ya existe un vehiculo con el id ${id} o la placa ${placa} en la base de datos`})
            }

            let vehiculo = new Vehiculo;
            vehiculo.id = id;
            vehiculo.placa = placa;
            vehiculo.marca = id_marca;
            vehiculo.color = id_color;
            vehiculo.cilindraje = cilindraje;
            vehiculo.tipo_Vehiculo = id_TipoVehiculo;
            vehiculo.pasajeros = cantidadPasajeros;
            vehiculo.fecha_ingreso = fecha_ingreso;
            vehiculo.estado = true;

            const validateOpt = {ValidationError:{target:false, value: false}};
            const errors = await validate(vehiculo,{validationError:{target:false, value:false}});
            if(errors.length > 0){
                return res.status(400).json(errors);
            }

            const repoMarca = AppDataSource.getRepository(Marca);
            let marca;
            try {
                marca = await repoMarca.findOneOrFail({where:{id:id_marca}});
            } catch (ex) {
                return res.status(404).json({message:`No existe la categoria con el id ${id_marca}`})
            }
            vehiculo.marca = marca;

            const repoColor = AppDataSource.getRepository(Color);
            let color
            try {
                color = await repoMarca.findOneOrFail({where:{id:id_color}});
            } catch (ex) {
                return res.status(404).json({message:`No existe el color con el id ${id_color}`})
            }
            vehiculo.color = color;

            const repoTipo = AppDataSource.getRepository(Tipo_Vehiculo);
            let tipo;
            try {
                tipo = await repoTipo.findOneOrFail({where:{id:id_TipoVehiculo}});
            } catch (ex) {
                return res.status(404).json({message:`No existe el tipo de vehiculo con el id ${id_TipoVehiculo}`})
            }
            vehiculo.tipo_Vehiculo = tipo;

            await repoVehiculo.save(vehiculo);
            
        } catch (error) {
            return res.status(400).json({message:"Error al guardar el vehiculo."})
        }
        return res.status(200).json("Vehiculo guardado correctamente.");
    }

    static getOne = async (req: Request, res: Response) => {
        try {
            const placa = (req.params['placa'])
            const repoVehiculo = AppDataSource.getRepository(Vehiculo);
            try {
                const vehiculo = await repoVehiculo.findOneOrFail({where:{placa}, relations:{marca:true, color:true, tipo_Vehiculo:true}});
                return res.status(200).json(vehiculo);
            } catch (error) {
                return res.status(404).json({message:`No existe el vehiculo con la placa ${placa} en la base de datos`})
            }
        } catch (error) {
            return res.status(400).json({meesage:"Error al conectar con la base de datos"})
        }
    }

    static delete = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params['id']);
            const repoVehiculo = AppDataSource.getMongoRepository(Vehiculo);
            let vehiculo;
            try {
                vehiculo = await repoVehiculo.findOneOrFail({where:{id}});
            } catch (error) {
                return res.status(404).json({message:`No existe un vehiculo con el id ${id} en la base de datos`})
            }

            vehiculo.estado = false;
            await repoVehiculo.save(vehiculo);
            return res.status(200).json({message:"El vehiculo ha sido eliminado"})
        } catch (error) {
            return res.status(400).json({meesage:"Error al eliminar el vehiculo"})
        }
    }
}

export default VehiculoController;