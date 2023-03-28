import { Router, json } from "express";
import { CartManager } from "../dao/index.js";
import { manager } from "./products.router.js";



const cartRouter = Router();
cartRouter.use(json());

const cartManager = new CartManager();

cartRouter.get("/", async (req, res) => {
  try {
    let cart = await cartManager.getCarts();
    res.status(201).send(cart)
  } catch (e) {
    res.status(404).send("No se pueden obtener los carritos")
  }
});

cartRouter.post("/", async (req, res) => {
  try {
    await cartManager.addCart();
    const cart = await cartManager.getCarts();
    res.status(201).send(cart);
  } catch (e) {
    res.status(404).send("Hubo un error al crear el carrito")
  }
});

cartRouter.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartManager.getCartbyId(parseInt(cid))
    if (cart == undefined) {
      res.send("carrito inexistente");
    } else {
      res.send(cart)
    }
  } catch (e) {
    res.status(404).send("No se pueden obtener el carrito")
  }
});

cartRouter.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const prodId = parseInt(pid);
  const cartId = parseInt(cid);
  try {
    let product = await manager.getProductbyId(prodId);
    await cartManager.addProducttoCart(cartId, product);
    res.send(`Producto con id: ${prodId} agregado al carrito con id: ${cartId}`);
  } catch (e) {
    res.status(404).send(`No se pudo agregar el producto con id: ${prodId} al carrito con id: ${cartId}`)
  }

});


export default cartRouter;
