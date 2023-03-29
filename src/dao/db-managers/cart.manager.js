import cartModel from "../models/carts.models.js"

// const fs = require("fs");


class CartManager {

    constructor() {
        console.log("Trabajando con DB!")
    }


    async getCarts() {
        try {
            const result = await cartModel.find().lean();
            return result;
        } catch (error) {
            return [];
        }
    }

    async getCartbyId(id) {
        const cartFilter = await cartModel.findById(id);
        if (!cartFilter) {
            console.log("Carrito no encontrado");
        } else {
            return cartFilter;
        }
    }

    async getCartProducts(cid) {
        const cart = await cartModel.findById(cid);
        return cart.products;
    }

    async addCart(products) {
        try {
            const newCart = { products: [] };
            const result = await cartModel.create(newCart);
            return result
        } catch (error) {
            console.log("No se pudo crear el carrito")
        }

    }

    async addProducttoCart(cartId, product) {
        try {
            const cart = await cartModel.findById(cartId)
            const prod = cart.products.find(aux => aux.ProdId == product._id)
            if (prod) {
                prod.quantity += 1;
                await cart.save()
            } else {
                cart.products.push({ ProdId: product._id, quantity: 1 })
                await cart.save()
            }
        } catch (error) {
            throw new Error;
        }
    }
    async deleteCart(cartId) {
        const cart = await cartModel.findById(cartId);
        if (!cart) {
            return ("No existe ese carrito")
        } else {
            cartModel.deleteOne(cartId)
            console.log(`Se ha eliminado el carrito con el id : ${id}`);
        }
    }
};


export default CartManager;
