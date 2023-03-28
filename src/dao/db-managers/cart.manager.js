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
            for (const prod of products) {
                newCart.products.push({ ...prod, quantity: 1 })
            }
            const result = await cartModel.create(newCart);
            return result
        } catch (error) {
            console.log("No se pudo crear el carrito")
        }

    }

    async addProducttoCart(cartId, prodId) {
        const cart = await cartModel.findById(cartId);
        for (let index = 0; index < cart.products.length; index++) {//recorro los productos que hay en el carrito
            if (cart.products[index].idProduct == prodId) { //busco el producto (posicion index) cuyo ID sea igual a prodId
                cart.products[index].quantity = cart.products[index].quantity + 1;//como encontre el producto en el carrito le sumo 1 a la cantidad
                cart.save();
                return console.log("Producto agregado")
            }
        }
        cart.products.push({ idProduct: prodId, quantity: 1 }) //el producto prodId no esta en el carrito cartId entonces lo agrego con cantidad 1
        cart.save()
        return console.log("Producto agregado")
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
