import { Router, json, urlencoded } from "express";
import userModel from "../dao/models/user.models.js";

const authRouter = Router();
authRouter.use(json());
authRouter.use(urlencoded({ extended: true }));

authRouter.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await userModel.findOne({ email: email })
        let rol;
        if (!user) {
            if (email === "adminCoder@coder.com" & password === "adminCod3r123") {
                rol = "admin"
            } else {
                rol = "user";
            }
            const newUser = await userModel.create({ name, email, password, rol });
            console.log("usuario Registrado!");
            res.redirect("/profile");
        } else {
            res.send(`El usuario ingresado ya existe!, Ingresia haciendo click aqui: <a href="/login">Iniciar Sesion</a>`)
        }
    }
    catch (error) {
        res.status(401).send("Error al crear el usuario")
    }
});

authRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email: email })
        if (!user) {
            console.log("Usuario inexistente, te redireccionaremos a la página de login..."),
                res.redirect("/signup");
        } else if (email === user.email & password === user.password) {
            req.session.user = user.name
            req.session.email = user.email
            req.session.rol = user.rol
            res.redirect("/products")
        } else {
            res.send("Usuario y contraseña incorrecto")
        }
    } catch (error) {
        res.status(401).send("Error al crear el usuario")
    }
});

authRouter.post("/logout", (req, res) => {
    req.session.destroy(error => {
        if (error) {
            res.send("No se pudo cerrar la sesion")
        } else {
            res.redirect("/login")
        }
    });
});


export default authRouter;
