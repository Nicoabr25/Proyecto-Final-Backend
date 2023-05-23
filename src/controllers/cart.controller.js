import { CartManager } from "../config/persistance.js";
import { manager } from "../controllers/products.controller.js"



export const cartManager = new CartManager();

export const getCartController = async (req, res) => {
    try {
        let cart = await cartManager.getCarts();
        res.status(201).send(cart)
    } catch (e) {
        res.status(404).send("No se pueden obtener los carritos")
    }
};

export const createCartController = async (req, res) => {
    try {
        await cartManager.addCart();
        const cart = await cartManager.getCarts();
        res.status(201).send(cart);
    } catch (e) {
        res.status(404).send("Hubo un error al crear el carrito")
    }
}

export const getCartByIdController = async (req, res) => {
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
}

export const AddProducttoCartController = async (req, res) => {
    const { cid, pid } = req.params;
    try {
        await cartManager.addProducttoCart(cid, pid);
        res.send(`Producto con id: ${pid} agregado al carrito con id: ${cid}`);
    } catch (error) {
        res.status(404).send(`No se pudo agregar el producto con id: ${pid} al carrito con id: ${cid}`)
    }

}

export const DeleteProductFromCartController = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        await cartManager.deleteProductinCart(cid, pid);
        res.send({ status: "success", payload: "Se ha eliminado el producto del carrito" })
    } catch (error) {
        res.send({ status: "404 Error", payload: "Ha ocurrido un error" })
    }
}

export const DeleteCartController = async (req, res) => {
    try {
        const { cid } = req.params;
        await cartManager.deleteCart(cid);
        return res.send("Se ha eliminado el carrito")
    } catch { error } {
        return res.send({ status: "error", payload: " No se ha eleiminado el carrito" })
    }
}

export const GetProductsinCart = async (req, res) => {
    try {
        const { cid } = req.params;
        const productsInCart = await cartManager.getCartProducts(cid);
        res.status(201).send(productsInCart)
    } catch (error) {
        res.send({ status: "Error", payload: " No se pudieron obtener los productos del carrito" })
    }
}