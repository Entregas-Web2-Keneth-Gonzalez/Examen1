import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Marca } from "../entity/Marca";
import { validate } from "class-validator";

class MarcaController {

    static create = async (req: Request, res: Response) => {
        const repoMarca = AppDataSource.getRepository(Marca);
        try {
            const {id, nombre, metalizado} = req.body;

            let marca = await repoMarca.findOne({where:{id}});
            if(marca){
                return res.status(400).json({message:`Ya se ha registrado una marca con el id ${id} en la base de datos`})
            }
            marca = new Marca;

            marca.id = id;
            marca.nombre = nombre;
            marca.metalizado = metalizado;
            marca.estado = true;

            const validateOpt = {ValidationError:{target:false, value:false}};
            const errors = await validate(marca,{validationError:{target:false, value:false}});

            if(errors.length > 0){
                return res.status(400).json(errors);
            }
            await repoMarca.save(marca);
        } catch (error) {
            return res.status(400).json({message:"Error al guardar la marca."})
        }
        return res.status(200).json("Marca guardada correctamente.");
    }

    static update = async (req: Request, res: Response) => {
        try {
            const repoMarca = AppDataSource.getRepository(Marca);
            const id = parseInt(req.params['id']);
            const {nombre, metalizado} = req.body;
            let marca: Marca;
            try {
               marca = await repoMarca.findOneOrFail({where:{id}}); 
            } catch (error) {
                return res.status(404).json({message:`No existe un producto con el id ${id} en la base de datos`})
            }
            marca.nombre = nombre;
            marca.metalizado = metalizado;

            const errors= await validate(marca,{validationError:{target:false, value:false}});
            if(errors.length > 0){
                return res.status(400).json(errors);
            }

            await repoMarca.save(marca);
            return res.status(200).json({message:"La marca ha sido modificada correctamente."});
        } catch (error) {
            return res.status(400).json({message:"Error al actualizar la marca"})
        }

    }

    static delete = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params['id']);
            const repoMarca = AppDataSource.getRepository(Marca);
            let marca:Marca;

            try {
                marca = await repoMarca.findOneOrFail({where:{id}});
            } catch (error) {
                return res.status(404).json({message:`No se encuentra la marca con el id ${id} en la base de datos`})
            }

            marca.estado = false;
            await repoMarca.save(marca);
            return res.status(200).json({message:"La marca ha sido eliminada"})
        } catch (error) {
            return res.status(400).json({message:"Error al eliminar la marca"})
        }
    }

    static getAll = async (req: Request, res: Response) => {
        try {
            const repoMarca = AppDataSource.getRepository(Marca);
            const lista = await repoMarca.find({where: {estado:true}, relations:{vehiculo:true}});

            if(lista.length == 0){
                return res.status(400).json({message:"No hay marcas registradas"})
            }
            return res.status(200).json(lista);
        } catch (error) {
            return res.status(400).json({message:"Error al acceder a la base de datos"})
        }
    }

    static getOne = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params['id']);
            const repoMarca = AppDataSource.getRepository(Marca);
            try {
                const marca = await repoMarca.findOneOrFail({where:{id, estado:true}, relations:{vehiculo:true}});
                return res.status(200).json(marca);
            } catch (error) {
                return res.status(404).json({message:`La marca con el id ${id} no existe en la base de datos`})
            }
        } catch (error) {
            return res.status(400).json({message:"Error al acceder a la base de datos"})
        }
    }

}

export default MarcaController;