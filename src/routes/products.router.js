import { Router, json } from "express";
import ProductManager from "../managers/ProductManager.js";
import { manager } from "../app.js";


const productRouter = Router();
productRouter.use(json());

//localhost:8080/api/products?limit=3
productRouter.get("/", async (req, res) => {
  const { limit } = req.query;
  const products = await manager.getProducts();
  if (limit == undefined) {
    res.send(products);
  } else {
    const aux = products.slice(0, parseInt(limit));
    res.send(aux);
  }
});

//localhost:8080/products/2
productRouter.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  const ProductId = await manager.getProductbyId(parseInt(pid));
  if (ProductId == undefined) {
    res.send("Producto inexistente");
  } else {
    res.send(ProductId);
  }
});

productRouter.post("/", async (req, res) => {
  //id: contador,title,description,price,thumbnail,code,stock,category, status,
  try {
    const { title, description, price, thumbnail = [], code, stock, categoty, status = true } = req.body;
    await manager.addProduct(title, description, parseInt(price), thumbnail, code, parseInt(stock), categoty, status);
    res.send({ status: "success", payload: req.body });
  } catch (error) {
    res.status(404).send("Hubo un error en tu petición");
  }
});

productRouter.put("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const id = parseInt(pid);
    await manager.updateProduct(id, req.body);

    res.send({ status: "success", payload: await manager.getProductbyId(id) })
  }
  catch {
    res.send("No se pudo actualizar el producto")
  }

})

productRouter.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  const id = parseInt(pid);
  await manager.deleteProduct(id);
  res.send("Producto Eliminado")
})

export default productRouter;
