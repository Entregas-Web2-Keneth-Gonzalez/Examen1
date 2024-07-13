import { Router } from "express";
import marca from "./marca";
import vehiculo from "./vehiculo";

const routes = Router();

routes.use("/Marcas", marca);
routes.use("/Vehiculos", vehiculo);

export default routes;