import cartModel from "../models/carts.models.js"
import productModel from "../models/products.models.js";


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



    async addProducttoCart(cartId, prodId) {
        try {
            const cart = await cartModel.findById(cartId).populate("products.product");
            const productIndex = cart.products.findIndex(prod => prod.product._id.toString() === prodId);
            if (productIndex >= 0) {
                cart.products[productIndex].quantity = cart.products[productIndex].quantity + 1;
                cart.save();
            } else {
                cart.products.push({ product: prodId, quantity: 1 });
                cart.save();
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

    async deleteProductinCart(cid, pid) {
        try {
            const cart = await cartModel.findById(cid);
            const prod = cart.products.find(aux => aux.product._id == pid)
            if (!prod) {
                throw new Error("No existe dicho producto en el carrito")
            }
            if (prod.quantity > 1) {
                prod.quantity = prod.quantity - 1;
                cart.save()
            } else if (prod.quantity <= 1) {
                const productIndex = cart.products.findIndex(prod => prod.product._id.toString() == pid)
                cart.products.splice(productIndex, 1)
                cart.save()
            }
        } catch (Error) {
            throw new Error("no se pudo realizar la operación")
        }
    }

    // let newCartProducts = cart.products.filter((p) => p.product._id !== prodId);
    // cart.products = newCartProducts;
    // cart.products.deleteOne
    // console.log("newCartProducts", newCartProducts)
    // cart.save()

    async PurchaseCart(cid) {
        try {
            const cart = await cartModel.findById(cid)
            if (!cart) {
                res.send("carrito inexistente");
            } else {
                const ticketProducts = []
                const rejectedProducts = []
                if (!cart.products.length) {
                    return req.send("No hay productos en el carrito, agreguelos...")
                }
                for (let i = 0; i < cart.products.length; i++) {
                    const cartProduct = cart.products[i]
                    const productDB = await productModel.findById(cartProduct.product._id)
                    if (cartProduct.quantity <= productDB.stock) {
                        ticketProducts.push(cartProduct)
                    } else {
                        rejectedProducts.push(cartProduct)
                    }
                }
                return (ticketProducts)
            }
        } catch (error) {
            throw new Error
        }
    }


}


export default CartManager;
