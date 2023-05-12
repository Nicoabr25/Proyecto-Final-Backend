import { CartManager } from "../config/persistance.js";
import { manager } from "../controllers/products.controller.js"


const cartManager = new CartManager();

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
    const prodId = pid;
    const cartId = cid;
    try {
        let product = await manager.getProductbyId(prodId);
        await cartManager.addProducttoCart(cartId, product);
        res.send(`Producto con id: ${prodId} agregado al carrito con id: ${cartId}`);
    } catch (e) {
        res.status(404).send(`No se pudo agregar el producto con id: ${prodId} al carrito con id: ${cartId}`)
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
        res.send({ status: "succes", payload: "Se ha eliminado el carrito" })
    } catch { Erro } {
        res.send({ status: "Error", payload: " No se ha eleiminado el carrito" })
    }
}