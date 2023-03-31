import { Router, json } from "express";
import { manager } from "./products.router.js";
import ChatManager from "../dao/db-managers/chat.manager.js";

const viewsRouter = Router();
viewsRouter.use(json());

const chatManager = new ChatManager();

viewsRouter.get("/", async (req, res) => {
    const products = await manager.getProducts();
    res.render("home", { products, style: "index" }) // home.handlebars le paso el style de css
});

viewsRouter.get("/real-time-products", async (req, res) => {
    const products = await manager.getProducts();
    res.render("real_time_products", { products, style: "index2" })
})

viewsRouter.get("/chat", async (req, res) => {
    try {
        const messages = await chatManager.getMessages();
        res.render("chat", { messages: messages })
    } catch (Error) {
        console.log("No se pudieron obtener los chats")
    }
})


export default viewsRouter;