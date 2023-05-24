import { Router, json } from "express";
import { GetRealTimeProductsController, ChatController, ProductViewController, HomeController, LoginViewController, ProfileViewController, ForgotViewController, SignupViewContoller } from "../controllers/views.controller.js";
import { checkRole } from "../middlewares/roles.js";

const viewsRouter = Router();
viewsRouter.use(json());

//Ruta para los real time Products mediante socket.io//
viewsRouter.get("/real-time-products", GetRealTimeProductsController)

//Ruta para chat mediante socket.io//
viewsRouter.get("/chat", checkRole(["user"]), ChatController)

//Ruta para la view de productos//
viewsRouter.get("/products", ProductViewController);

//Ruta para la view de homes//
viewsRouter.get("/", HomeController);

//Ruta para la view de Login//
viewsRouter.get("/login", LoginViewController);

//Ruta para la view de profile//
viewsRouter.get("/profile", ProfileViewController);

//Ruta para la view de forgot//
viewsRouter.get("/forgot", ForgotViewController);

//autentificación//
//Ruta para la view de Signup//
viewsRouter.get("/signup", SignupViewContoller);


export default viewsRouter;