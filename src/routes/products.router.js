import { Router, json } from "express";
import ProductManager from "../managers/ProductManager.js";
// import { manager } from "../app.js";


const productRouter = Router();
productRouter.use(json());

const manager = new ProductManager("./src/json/products.json");

//localhost:8080/api/products?limit=3
productRouter.get("/", async (req, res) => {
  try {
    const { limit } = req.query;
    const products = await manager.getProducts();
    if (limit == undefined) {
      res.send(products);
    } else {
      const aux = products.slice(0, parseInt(limit));
      res.send(aux);
    }
  } catch (e) {
    res.status(404).send("No se pueden obtener los productos")
  }
});

//localhost:8080/products/2
productRouter.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const ProductId = await manager.getProductbyId(parseInt(pid));
    if (ProductId == undefined) {
      res.send("Producto inexistente");
    } else {
      res.send(ProductId);
    }
  } catch (e) {
    res.status(404).send("No se puede obtener el producto deseado")
  }
});

productRouter.post("/", async (req, res) => {
  //id: contador,title,description,price,thumbnail,code,stock,category, status,
  const { title, description, price, thumbnail = [], code, stock, categoty, status = true } = req.body;
  try {
    await manager.addProduct(title, description, parseInt(price), thumbnail, parseInt(code), parseInt(stock), categoty, status);
    res.status(201).send("Producto agregado con exito");
  } catch (e) {
    res.status(404).send(`El producto con el código: ${code} ya existe en la lista, no se pudo agregar nuevo producto`);
  }
});

productRouter.put("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const id = parseInt(pid);
    await manager.updateProduct(id, req.body);
    res.send({ status: "success", payload: await manager.getProductbyId(id) })
  }
  catch (e) {
    res.status(404).send("No se pudo actualizar el producto")
  }
});

productRouter.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const id = parseInt(pid);
    await manager.deleteProduct(id);
    res.send("Producto Eliminado")
  } catch (e) {
    res.status(404).send("No se pudo eliminar el producto, id inexistente")
  }
})

export default productRouter;
export { manager };