import { Router, json } from "express";
import { getCartController, createCartController, getCartByIdController, AddProducttoCartController, DeleteProductFromCartController, DeleteCartController, GetProductsinCart, notCartController, PurchaseCartController, ClearCartController } from "../controllers/cart.controller.js";
import { checkRole } from "../middlewares/roles.js";

const cartRouter = Router();
cartRouter.use(json());

//Ruta para buscar todos los carritos//
cartRouter.get("/", getCartController);

//Ruta para crear un carrito//
cartRouter.post("/", createCartController);

//Ruta para buscar el carrito por id//
cartRouter.get("/:cid", getCartByIdController);

//Ruta para agregar el producto (pid) al carrito (cid)//
cartRouter.post("/:cid/product/:pid", checkRole(["user"]), AddProducttoCartController);

//Ruta de error al no crear carrito y no logearse
cartRouter.post("/error", notCartController);

//Ruta para borrar un producto (pid) del carrito (cid)//
cartRouter.delete("/:cid/product/:pid", DeleteProductFromCartController);

//Ruta POST para borrar un producto (pid) del carrito (cid)//
cartRouter.post("/:cid/delete/:pid", DeleteProductFromCartController);

//Ruta para borrar el carrito//
cartRouter.delete("/:cid", DeleteCartController)

//Ruta para obtener Productos del carrito//
cartRouter.get("/:cid/product", GetProductsinCart)

//Ruta para confirmar la compra//
cartRouter.post("/:cid/purchase", PurchaseCartController)

//Ruta para vaciar carrito//
cartRouter.post("/:cid/clearcart", ClearCartController)

export default cartRouter;
