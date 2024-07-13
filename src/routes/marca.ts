import { Router } from "express";
import MarcaController from "../controller/MarcaController";

const routes = Router();

routes.post("", MarcaController.create)
routes.put("/update/:id", MarcaController.update)
routes.delete("/delete/:id", MarcaController.delete)
routes.get("", MarcaController.getAll)
routes.get("/getOne/:id", MarcaController.getOne)

export default routes;