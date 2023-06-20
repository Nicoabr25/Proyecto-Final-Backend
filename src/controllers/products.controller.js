import { ProductManager } from "../config/persistance.js";

const manager = new ProductManager();

export const getProductsController = async (req, res) => {
    try {
        const { limit, page, category, sort, queryKey, queryParam } = req.query;
        const products = await manager.getProducts(limit, page, category);
        res.send({ status: "success", payload: products });
    } catch (e) {
        ProductErrorFunction() //funcion que lleva al manejo del error
        res.status(404).send("No se pueden obtener los productos")
    }
};

export const getProductbyIdController = async (req, res) => {
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
};

export const createProductController = async (req, res) => {
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
};

export const updateProductController = async (req, res) => {
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
};

export const deleteProductController = async (req, res) => {
    try {
        const { pid } = req.params;
        await manager.deleteProduct(pid);
        const products = await manager.getProducts();
        req.io.emit("deleted-product", products);
        res.send("Producto Eliminado")
    } catch (e) {
        res.status(404).send("No se pudo eliminar el producto, id inexistente")
    }
}

export { manager }
