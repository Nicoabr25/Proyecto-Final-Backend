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
    const cart = await cartManager.getCartbyId(cid)
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
  const prodId = pid;
  const cartId = cid;
  try {
    let product = await manager.getProductbyId(prodId);
    await cartManager.addProducttoCart(cartId, product);
    res.send(`Producto con id: ${prodId} agregado al carrito con id: ${cartId}`);
  } catch (e) {
    res.status(404).send(`No se pudo agregar el producto con id: ${prodId} al carrito con id: ${cartId}`)
  }

});

cartRouter.delete("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    await cartManager.deleteProductinCart(cid, pid);
    res.send({ status: "success", payload: "Se ha eliminado el producto del carrito" })
  } catch (error) {
    res.send({ status: "404 Error", payload: "Ha ocurrido un error" })
  }
});


cartRouter.delete("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    await cartManager.deleteCart(cid);
    res.send({ status: "succes", payload: "Se ha eliminado el carrito" })
  } catch { Erro } {
    res.send({ status: "Error", payload: " No se ha eleiminado el carrito" })
  }
})

export default cartRouter;
