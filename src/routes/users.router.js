import { Router, json, urlencoded } from "express";
import { PremiumUser, DocumentsController } from "../controllers/users.controller.js";
import { checkRole } from "../middlewares/roles.js";
import { uploaderDocuments } from "../config/file-upload.js";
import { checkAuthenticated } from "../middlewares/isAuth.js";


const usersRouter = Router();
usersRouter.use(json());
usersRouter.use(urlencoded({ extended: true }));

//ruta para transformar a premium a los users//

usersRouter.put("/premium/:uid", checkRole(["admin"]), PremiumUser)

usersRouter.post("/:uid/documents", checkAuthenticated, uploaderDocuments.fields([{ name: "identificacion", maxCount: 1 }, { name: "domicilio", maxCount: 1 }, { name: "estadoDeCuenta", maxCount: 1 }]), DocumentsController)

export default usersRouter