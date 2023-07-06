import { Router, json } from "express";
import { GetRealTimeProductsController, ChatController, ProductViewController, HomeController, LoginViewController, ProfileViewController, ForgotViewController, SignupViewContoller, errorController, loggerTestController, newPasswordViewController } from "../controllers/views.controller.js";
import { checkRole } from "../middlewares/roles.js";
import compression from "express-compression";


const viewsRouter = Router();
viewsRouter.use(json());

//Ruta para los real time Products mediante socket.io//
viewsRouter.get("/real-time-products", GetRealTimeProductsController)

//Ruta para chat mediante socket.io//
viewsRouter.get("/chat", checkRole(["user", "premium"]), ChatController)

//Ruta para la view de productos//
viewsRouter.get("/products", compression({ brotli: { enable: true, zlib: {} } }), ProductViewController);

//Ruta para la view de homes//
viewsRouter.get("/", compression({ brotli: { enable: true, zlib: {} } }), HomeController);

//Ruta para la view de Login//
viewsRouter.get("/login", LoginViewController);

//Ruta para la view de profile//
viewsRouter.get("/profile", ProfileViewController);

//Ruta para la view de forgot//
viewsRouter.get("/forgot", ForgotViewController);

//autentificación//
//Ruta para la view de Signup//
viewsRouter.get("/signup", SignupViewContoller);

//Ruta para la página de error//
viewsRouter.get("/error", errorController)

//Ruta para loggertest//
viewsRouter.get("/loggerTest", loggerTestController)

//Ruta para restablecer la contraseña//
viewsRouter.get("/newPassword", newPasswordViewController)

export default viewsRouter;