import { Router, json } from "express";
import { ProductManager } from "../dao/index.js";


const productRouter = Router();
productRouter.use(json());

const manager = new ProductManager();

//localhost:8080/api/products?limit=3
productRouter.get("/", async (req, res) => {
  try {
    const { limit, page, sort, queryKey, queryParam } = req.query;
    const products = await manager.getProducts(limit, page, sort, queryKey, queryParam);
    res.send(products);
    // if (limit == undefined) {
    //   const aux = products.slice(0, 10);
    //   res.send(aux);
    // } else {
    //   const aux = products.slice(0, parseInt(limit));
    //   res.send(aux);
    // }
  } catch (e) {
    res.status(404).send("No se pueden obtener los productos")
  }
});


// productRouter.get("/", async (req, res) => {
//   try {
//     const { limit, page, sort, queryKey, queryParam } = req.query;
//     const products = await manager.getProducts(limit, page, sort, queryKey, queryParam);
//     res.send(products);
//     // if (limit == undefined) {
//     //   const aux = products.slice(0, 10);
//     //   res.send(aux);
//     // } else {
//     //   const aux = products.slice(0, parseInt(limit));
//     //   res.send(aux);
//     // }
//   } catch (e) {
//     res.status(404).send("No se pueden obtener los productos")
//   }
// });
//localhost:8080/products/2
productRouter.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const ProductId = await manager.getProductbyId(pid);
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
  try {
    const title = req.body.title;
    const description = req.body.description;
    const price = Number(req.body.price);
    const thumbnail = req.body.thumbnail;
    const code = Number(req.body.code);
    const stock = Number(req.body.stock);
    const category = req.body.category;
    const status = true;

    const result = await manager.addProduct(title, description, price, thumbnail, code, stock, category, status);
    req.io.emit("new-product", result);
    res.status(201).send("Producto agregado con exito");
  } catch (e) {
    res.status(404).send(`Error, no se pudo agregar el producto`);
  }
});

productRouter.put("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const id = pid;
    const products = await manager.getProducts();
    await manager.updateProduct(id, req.body);
    req.io.emit("product-updated", products);
    res.send({ status: "success", payload: await manager.getProductbyId(id) })
    req.io.emit
  }
  catch (e) {
    res.status(404).send("No se pudo actualizar el producto")
  }
});

productRouter.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const id = pid;
    await manager.deleteProduct(id);
    const products = await manager.getProducts();
    req.io.emit("deleted-product", products);
    res.send("Producto Eliminado")
  } catch (e) {
    res.status(404).send("No se pudo eliminar el producto, id inexistente")
  }
})

export default productRouter;
export { manager };