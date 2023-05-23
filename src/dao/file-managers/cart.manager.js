import fs from "fs";
import { __dirname } from "../../utils.js"
import { nextID, nextCartId } from "./utilidades.js";

// const fs = require("fs");

const path = __dirname + "/dao/json/cart.json"

class CartManager {

    constructor() {
        console.log("Trabajando con FileSystem")
    }

    async getCarts() {
        try {
            const carts = await fs.promises.readFile(path, "utf-8");
            return JSON.parse(carts);
        } catch (error) {
            return [];
        }
    }

    async getCartbyId(cid) {
        const id = Number(cid)
        const carts = await this.getCarts();
        const cartFilter = carts.find((cart) => cart.id == id);
        if (!cartFilter) {
            console.log("Carrito no encontrado");
        } else {
            return cartFilter;
        }
    }

    async getCartProducts(cid) {
        const id = Number(cid)
        const cart = await this.getCartbyId(id);
        return cart.products;
    }

    async addCart() {
        let carts = await this.getCarts();
        // let contador = await this.Contador();
        const newCart = {
            id: nextCartId(carts),
            products: [], //pid , quantity
        }
        await fs.promises.writeFile(path, JSON.stringify([...carts, newCart]));
        // console.log(`El carrito con el id: ${id} se ha agregado con exito`);
    }

    async addProducttoCart(cid, pid) { //tengo que ver como vincular el carrito al ProductManager para ver si el id pasado es un producto real, ver stock y demás...
        const cartid = Number(cid)
        const prodId = Number(pid);
        const carts = await this.getCarts();
        const cart = await this.getCartbyId(cartid);

        let prodInCart = cart.products.find((p) => p._id == prodId)

        if (prodInCart) { //quiere decir que existe el producto pid en el carrito cid
            prodInCart.quantity += 1 //aumento la cantidad en 1
            let ProductsInCart = cart.products.filter((prod) => prod._id !== prodInCart._id) //busco los productos que tienen otro id del carrito
            let newCartProducts = [...ProductsInCart, prodInCart] //array con lso productos y el aumentado la cantidad
            cart.products = newCartProducts; //actualzio los productos del carrito
            let newCarts = carts.filter((cart) => cart.id !== cartid) //busco los carritos que no tienen el id cdid
            newCarts = [...newCarts, cart] //agrego el carrito actualziado a los demás carritps
            await fs.promises.writeFile(path, JSON.stringify(newCarts))//escribo los nuevos carritos
        } else {//el producto no esta en el carrito
            cart.products = [...cart.products, { _id: prodId, quantity: 1 }] //agrego el producto al carrito
            let newCarts = carts.filter((cart) => cart.id !== cartid)
            newCarts = [...newCarts, cart]
            await fs.promises.writeFile(path, JSON.stringify(newCarts))
        }
    }

    async deleteCart(cid) {
        const cartid = Number(cid)
        const carts = await this.getCarts();
        const verificacion = carts.some(cart => cart.id == cartid)
        try {
            if (!verificacion) {
                return ("No existe ese carrito")
            } else {
                const aux = carts.filter((cart) => cart.id !== cartid);
                await fs.promises.writeFile(path, JSON.stringify(aux)); //reescribo el archivo
                return (`Se ha eliminado el carrito con el id : ${cartid}`);
            }
        } catch (error) {
            throw new error
        }
    }

};

///Para eliminar el archivo
async function eliminarArchivo(path) {
    await fs.promises.unlink(path);
}


export default CartManager;
