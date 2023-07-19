import { Router, json, urlencoded } from "express";
import { passportStrategySignupController, SignupRedirectController, passportFailedSignupController, CurrentController, GithubSignupController, GithubFailureSignupController, GithubCallbackController, LoginController, LogoutController, ForgotController, newPasswordController } from "../controllers/Auth.controller.js";
import { uploaderProfile } from "../config/file-upload.js";

const authRouter = Router();
authRouter.use(json());
authRouter.use(urlencoded({ extended: true }));

//Ruta para ingresar mediante passport Signup//
authRouter.post("/signup", uploaderProfile.single("avatar"), passportStrategySignupController, SignupRedirectController);

//Ruta por si falla el signup de passport//
authRouter.get("/failure-signup", passportFailedSignupController);

//Ruta para Current//
authRouter.get("/current", CurrentController);

//Ruta para ingresar mediante GitHub//
authRouter.get("/github", GithubSignupController); //usa la estrategia para autenticarse con github luego de autenticarse, github lo redirecciona al callback que habiamos configurado en la api de github
//Ruta por si falla el Signup por GitHub//
authRouter.get("/github-callback", GithubFailureSignupController, GithubCallbackController)

//Ruta para Login mediante passport//
authRouter.post("/login", LoginController);

//Ruta para Logout//
authRouter.post("/logout", LogoutController);

//Ruta para modificar contraseña de usuario//
authRouter.post("/forgot", ForgotController);

//Ruta para enviar email para recuperar contraseña//
authRouter.post("/newPassword", newPasswordController)

export default authRouter;
