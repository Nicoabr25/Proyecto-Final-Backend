import { Router, json, urlencoded } from "express";
import { PremiumUser } from "../controllers/users.controller.js";
import { checkRole } from "../middlewares/roles.js";


const usersRouter = Router();
usersRouter.use(json());
usersRouter.use(urlencoded({ extended: true }));

//ruta para transformar a premium a los users//

usersRouter.put("/premium/:uid", checkRole(["admin"]), PremiumUser)

export default usersRouter