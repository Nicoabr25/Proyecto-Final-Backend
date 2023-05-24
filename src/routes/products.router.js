import { Router, json } from "express";
import { getProductsController, getProductbyIdController, createProductController, updateProductController, deleteProductController } from "../controllers/products.controller.js";
import { checkRole } from "../middlewares/roles.js";

const productRouter = Router();
productRouter.use(json());

//Ruta para buscar producto//
productRouter.get("/", getProductsController);

//Ruta para buscar producto por ID//
productRouter.get("/:pid", getProductbyIdController);

//Ruta para crear producto//
productRouter.post("/", checkRole(["admin"]), createProductController);

//Ruta para actualizar producto//
productRouter.put("/:pid", checkRole(["admin"]), updateProductController);

//Ruta para eliminar producto//
productRouter.delete("/:pid", checkRole(["admin"]), deleteProductController);

export default productRouter;
