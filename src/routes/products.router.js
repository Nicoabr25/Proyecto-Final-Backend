import { Router, json } from "express";
import { getProductsController, getProductbyIdController, createProductController, updateProductController, deleteProductController } from "../controllers/products.controller.js";

const productRouter = Router();
productRouter.use(json());

//Ruta para buscar producto//
productRouter.get("/", getProductsController);

//Ruta para buscar producto por ID//
productRouter.get("/:pid", getProductbyIdController);

//Ruta para crear producto//
productRouter.post("/", createProductController);

//Ruta para actualizar producto//
productRouter.put("/:pid", updateProductController);

//Ruta para eliminar producto//
productRouter.delete("/:pid", deleteProductController);

export default productRouter;
