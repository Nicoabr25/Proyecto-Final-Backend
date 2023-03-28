import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    products: {
        type: [{
            idProduct: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products"
            },
            quantity: { type: Number },
        },],
        required: true,
    },
});

const cartModel = mongoose.model("carts", cartSchema); //lo guarda en la colección carts
export default cartModel;