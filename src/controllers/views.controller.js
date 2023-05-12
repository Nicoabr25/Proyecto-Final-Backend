import { manager } from "../controllers/products.controller.js"
import ChatManager from "../dao/db-managers/chat.manager.js";
import productModel from "../dao/models/products.models.js"

const chatManager = new ChatManager();

export const GetRealTimeProductsController = async (req, res) => {
    const { limit, page, sort, queryKey, queryParam } = req.query
    const products = await manager.getProducts(limit, page, sort, queryKey, queryParam);
    res.render("real_time_products", { products, style: "index2" })
}

export const ChatController = async (req, res) => {
    try {
        const messages = await chatManager.getMessages();
        res.render("chat", { messages: messages })
    } catch (Error) {
        console.log("No se pudieron obtener los chats")
    }
}

export const ProductViewControlelr = async (req, res) => {
    console.log(req.session)
    const userData = req.session
    const { page } = req.query;
    const products = await productModel.paginate(
        {}, { limit: 5, lean: true, page: page ?? 1 }
    );
    res.render("products", { products, style: "index", userData })
}

export const HomeController = async (req, res) => {
    const { limit, page, sort, queryKey, queryParam } = req.query
    const products = await manager.getProducts(limit, page, sort, queryKey, queryParam);
    res.render("home", { products, style: "index" }) // home.handlebars le paso el style de css
}

export const LoginViewController = async (req, res) => {
    const userData = req.session
    res.render("_login", { style: "login", userData })
}

export const ProfileViewController = async (req, res) => {
    console.log(req.session)
    const userData = req.session
    res.render("_profile", { style: "index", userData })
}

export const ForgotViewController = async (req, res) => {
    console.log(req.session)
    const userData = req.session
    res.render("_forgot", { style: "index", userData })
}

export const SignupViewContoller = async (req, res) => {
    res.render("_signup", { style: "index" })
}