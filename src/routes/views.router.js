import { Router, json } from "express";
import { manager } from "./products.router.js";
import ChatManager from "../dao/db-managers/chat.manager.js";
import productModel from "../dao/models/products.models.js"


const viewsRouter = Router();
viewsRouter.use(json());

const chatManager = new ChatManager();


viewsRouter.get("/real-time-products", async (req, res) => {
    const { limit, page, sort, queryKey, queryParam } = req.query
    const products = await manager.getProducts(limit, page, sort, queryKey, queryParam);
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

viewsRouter.get("/products", async (req, res) => {
    console.log(req.session)
    const userData = req.session
    const { page } = req.query;
    const products = await productModel.paginate(
        {}, { limit: 5, lean: true, page: page ?? 1 }
    );
    res.render("products", { products, style: "index", userData })
});

viewsRouter.get("/", async (req, res) => {
    const { limit, page, sort, queryKey, queryParam } = req.query
    const products = await manager.getProducts(limit, page, sort, queryKey, queryParam);
    res.render("home", { products, style: "index" }) // home.handlebars le paso el style de css
});

viewsRouter.get("/login", async (req, res) => {
    const userData = req.session
    res.render("_login", { style: "login", userData })
});

viewsRouter.get("/profile", async (req, res) => {
    console.log(req.session)
    const userData = req.session
    res.render("_profile", { userData })
});

//autentificación//

viewsRouter.get("/signup", async (req, res) => {
    res.render("_signup")
});


export default viewsRouter;