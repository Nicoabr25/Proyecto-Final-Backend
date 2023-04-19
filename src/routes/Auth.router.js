import { Router, json, urlencoded } from "express";
import userModel from "../dao/models/user.models.js";
import { createHash, isValid } from "../utils.js";

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
            const NewUserData = {
                name,
                email,
                password: createHash(password),
                rol,
            }
            const newUser = await userModel.create(NewUserData);
            req.session.user = newUser.name
            req.session.email = newUser.email
            req.session.rol = newUser.rol
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
            res.send(`Usuario inexistente, haz click  <a href="/signup">Aquí</a> para regiustrarte`)
        } else if (email === user.email & isValid(user, password) == true) {
            req.session.user = user.name
            req.session.email = user.email
            req.session.rol = user.rol
            res.redirect("/products")
        } else {
            res.send("Usuario y contraseña incorrecto")
        }
    } catch (error) {
        res.status(401).send("Error de login")
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


authRouter.post("/forgot", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email: email })
        if (user) {
            user.password = createHash(password);
            const userUpdate = await userModel.findByIdAndUpdate({ email: user.email }, user);
            res.send("Contraseña actualziada");
        } else {
            res.send("Usuario inexistente")
        }

    } catch (error) {
        res.send("No se pudo restaurar la contraeña")
    }
})

export default authRouter;
