import { Router, json } from "express";
import { manager } from "./products.router.js";

const viewsRouter = Router();
viewsRouter.use(json());

viewsRouter.get("/", async (req, res) => {
    const products = await manager.getProducts();
    res.render("home", { products, style: "index" }) // home.handlebars le paso el style de css
});

viewsRouter.get("/real-time-products", async (req, res) => {
    const products = await manager.getProducts();
    res.render("real_time_products", { products, style: "index2" })
})

export default viewsRouter;