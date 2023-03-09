import express from "express";
import productRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";

// const cartManager = new CartManager("./src/json/cart.json");
// const manager = new ProductManager("./src/json/products.json");

const app = express();

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

app.listen(8080, () => {
  console.log("server listening on port 8080");
});

// export { cartManager, manager }