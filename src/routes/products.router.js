import { Router, json } from "express";
import { getProductsController, getProductbyIdController, createProductController, updateProductController, deleteProductController } from "../controllers/products.controller.js";
import { checkRole } from "../middlewares/roles.js";
import compression from "express-compression";
import { uploaderProduct } from "../config/file-upload.js";

const productRouter = Router();
productRouter.use(json());

//Ruta para buscar producto//
productRouter.get("/", compression({ brotli: { enable: true, zlib: {} } }), getProductsController);

//Ruta para buscar producto por ID//
productRouter.get("/:pid", getProductbyIdController);

//Ruta para crear producto//
productRouter.post("/", checkRole(["admin", "premium"]), uploaderProduct.single("thumbnail"), createProductController);

//Ruta para actualizar producto//
productRouter.put("/:pid", checkRole(["admin"]), updateProductController);

//Ruta para eliminar producto//
productRouter.delete("/:pid", checkRole(["admin", "premium"]), deleteProductController);

export default productRouter;
