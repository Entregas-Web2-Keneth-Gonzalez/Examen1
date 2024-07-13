import { Router } from "express";
import VehiculoController from "../controller/VehiculoController";

const routes = Router();

routes.post("", VehiculoController.create)
routes.get("/placa/:id", VehiculoController.getOne)
routes.delete("/delete/:id", VehiculoController.delete)

export default routes;