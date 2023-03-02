import { Router, json } from "express";
import CartManager from "../managers/CartManager.js";
import { cartManager, manager } from "../app.js";


const cartRouter = Router();
cartRouter.use(json());

cartRouter.get("/", async (req, res) => {
  let cart = await cartManager.getCarts();
  res.send(cart)
})
cartRouter.post("/", async (req, res) => {
  try {
    await cartManager.addCart();
    res.send({ status: "success", payload: "Carrito creado" })
  } catch (error) {
    res.status(404).send("Hubo un error al crear el carrito")
  }
});

cartRouter.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  const cart = await cartManager.getCartbyId(parseInt(cid))
  if (cart == undefined) {
    res.send("carrito inexistente");
  } else {
    res.send(cart)
  }
});

cartRouter.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const prodId = parseInt(pid);
  const cartId = parseInt(cid);
  let product = await manager.getProductbyId(prodId)
  await cartManager.addProducttoCart(cartId, product);
  res.send(`Producto con id: ${prodId} agregado al carrito con id: ${cartId}`)
})


export default cartRouter;
