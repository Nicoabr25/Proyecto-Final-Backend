import fs from "fs";

// const fs = require("fs");

class CartManager {
    #path;

    constructor(path) {
        this.#path = path;
    }

    async Contador() {
        const carts = await this.getCarts();
        let id = carts.map((cart) => cart.id); //id contiene todos los Ids de produscts
        let contador = Math.max(...id); //obtengo el mayor id
        if (contador == -Infinity) {
            //Math.max devuelve el mayor número o -infinity si el array esta vacío
            return 1;
        } else {
            return ++contador; //devuelve Contador (ID mayor) +1
        }
    }

    async getCarts() {
        try {
            const carts = await fs.promises.readFile(this.#path, "utf-8");
            return JSON.parse(carts);
        } catch (error) {
            return [];
        }
    }

    async getCartbyId(id) {
        const carts = await this.getCarts();
        const cartFilter = carts.find((cart) => cart.id == id);
        if (!cartFilter) {
            console.log("Carrito no encontrado");
        } else {
            return cartFilter;
        }
    }

    async getCartProducts(cid) {
        const cart = await this.getCartbyId(cid);
        return cart.products;
    }

    async addCart() {
        let carts = await this.getCarts();
        let contador = await this.Contador();
        const newCart = {
            id: contador,
            products: [] //pid , quantity
        }
        await fs.promises.writeFile(this.#path, JSON.stringify([...carts, newCart]));
        console.log(`El carrito con el id: ${id} se ha agregado con exito`);
    }

    async addProducttoCart(cid, product) { //tengo que ver como vincular el carrito al ProductManager para ver si el id pasado es un producto real, ver stock y demás...
        const carts = await this.getCarts();
        const cart = await this.getCartbyId(cid);

        let prodInCart = cart.products.find((p) => p.id == product.id)

        if (prodInCart) { //quiere decir que existe el producto pid en el carrito cid
            prodInCart.quantity += 1 //aumento la cantidad en 1
            let ProductsInCart = cart.products.filter((prod) => prod.id !== prodInCart.id) //busco los productos que tienen otro id del carrito
            let newCartProducts = [...ProductsInCart, prodInCart] //array con lso productos y el aumentado la cantidad
            cart.products = newCartProducts; //actualzio los productos del carrito

            let newCarts = carts.filter((cart) => cart.id !== cid) //busco los carritos que no tienen el id cdid
            newCarts = [...newCarts, cart] //agrego el carrito actualziado a los demás carritps
            await fs.promises.writeFile(this.#path, JSON.stringify(newCarts))//escribo los nuevos carritos
        } else {//el producto no esta en el carrito
            cart.products = [...cart.products, { id: product.id, quantity: 1 }] //agrego el producto al carrito
            let newCarts = carts.filter((cart) => cart.id !== cid)
            newCarts = [...newCarts, cart]
            await fs.promises.writeFile(this.#path, JSON.stringify(newCarts))
        }
    }

    async deleteCart(id) {
        const carts = await this.getCarts();
        const verificacion = carts.some(cart => cart.id == id)
        if (!verificacion) {
            return ("No existe ese carrito")
        } else {
            const aux = carts.filter((cart) => cart.id !== id);
            await fs.promises.writeFile(this.#path, JSON.stringify(aux)); //reescribo el archivo
            console.log(`Se ha eliminado el carrito con el id : ${id}`);
        }
    }
};

///Para eliminar el archivo
async function eliminarArchivo(path) {
    await fs.promises.unlink(path);
}

export default CartManager;
