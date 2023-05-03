import mongoose from "mongoose";
import { cartCollection } from "./carts.models.js";

const userCollection = "users"

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    last_name: { type: String, required: true },
    age: { type: Number },
    email: { type: String, required: true },
    password: { type: String, required: true },
    rol: { type: String, enum: ["admin", "user"], default: "user" },
    cart: { type: [{ cart: { type: mongoose.Schema.Types.ObjectId, ref: cartCollection } }], default: [], },
});

const userModel = mongoose.model(userCollection, userSchema);
export default userModel;