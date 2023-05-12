import { Router, json } from "express";
import { getCartController, createCartController, getCartByIdController, AddProducttoCartController, DeleteProductFromCartController, DeleteCartController } from "../controllers/cart.controller.js";

const cartRouter = Router();
cartRouter.use(json());

//Ruta para buscar todos los carritos//
cartRouter.get("/", getCartController);

//Ruta para crear un carrito//
cartRouter.post("/", createCartController);

//Ruta para buscar el carrito por id//
cartRouter.get("/:cid", getCartByIdController);

//Ruta para agregar el producto (pid) al carrito (cid)//
cartRouter.post("/:cid/product/:pid", AddProducttoCartController);

//Ruta para borrar un producto (pid) del carrito (cid)//
cartRouter.delete("/:cid/product/:pid", DeleteProductFromCartController);

//Ruta para borrar el carrito//
cartRouter.delete("/:cid", DeleteCartController)

export default cartRouter;
