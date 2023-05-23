import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

export const cartCollection = "carts"
const cartSchema = new mongoose.Schema({
    products: {
        type: [{
            product: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
            quantity: { type: Number, default: 1 }
        }
        ], default: [],
    }
});

cartSchema.pre("findOne", function () {
    this.populate("products.product")//se refiere a la propiedad "product" del campo "products" de carrito
});


const cartModel = mongoose.model(cartCollection, cartSchema); //lo guarda en la colección carts
export default cartModel;