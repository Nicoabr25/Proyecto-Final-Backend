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
        try {
            const cartFilter = await cartModel.findById(id).populate("products.product").lean();
            if (!cartFilter) {
                console.log("Carrito no encontrado");
            } else {
                return cartFilter;
            }
        } catch (error) {
            return [];
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
            const prod = cart.products.find(aux => aux._Id == product._id)
            if (prod) {
                prod.quantity += 1;
                await cart.save()
                await cart.populate("products.product").lean()
            } else {
                cart.products.push({ ProdId: product._id, quantity: 1 })
                await cart.save();
                await cart.populate("products.product")
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

    async deleteProductinCart(cartId, prodId) {
        try {
            const cart = await cartModel.findById(cartId);
            const prod = cart.products.find(aux => aux.id == prodId)

            if (!prod) {
                throw new Error("No existe dicho producto")
            }
            if (prod.quantity > 1) {
                prod.quantity -= 1;
                cart.save()
            } else {
                let newCartProducts = cart.products.filter((p) => p.id !== prodId);
                cart.products = newCartProducts;
                cart.save()
            }
        } catch (Error) {
            throw new Error("no se pudo realizar la operación")
        }
    }
};


export default CartManager;
