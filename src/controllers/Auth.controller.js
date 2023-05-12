import userModel from "../dao/models/user.models.js";
import { createHash, isValid } from "../utils.js";
import passport from "passport";

export const passportStrategySignupController = passport.authenticate("signupStrategy", {
    failureRedirect: "/api/session/failure-signup"
});

export const SignupRedirectController = (req, res) => {
    req.session.user = req.user.name
    req.session.email = req.user.email
    req.session.rol = req.user.rol
    req.session.cartid = req.user.cart._id
    console.log(req.session);
    res.redirect("/profile");
};

export const passportFailedSignupController = (req, res) => {
    res.send("No fue posible registrar el usuario");
}

export const CurrentController = (req, res) => {
    if (req.session) {
        return res.send({ userInfo: req.session });
    }
    res.send("Usuario No Logueado");
}

export const GithubSignupController = passport.authenticate("githubSignup");

export const GithubFailureSignupController = passport.authenticate("githubSignup", {
    failureRedirect: "/api/session/failure-signup"
})

export const GithubCallbackController = (req, res) => {
    req.session.user = req.user.name
    req.session.email = req.user.email
    req.session.rol = "user"
    console.log(req.session)
    res.redirect("/profile")
    // res.send(`Usuario autenticado. Podes ver tu pérfil <a href="/profile">Aquí</a>`);
}
export const LoginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email: email })
        if (!user) {
            res.send(`Usuario inexistente, haz click  <a href="/signup">Aquí</a> para registrarte`)
        } else if (email === user.email & isValid(user, password) == true) {
            req.session.user = user.name
            req.session.email = user.email
            req.session.rol = user.rol
            req.session.age = user.age
            console.log(req.session)
            res.redirect("/products")
        } else {
            res.send("Usuario y contraseña incorrecto")
        }
    } catch (error) {
        res.status(401).send("Error de login")
    }
};

export const LogoutController = (req, res) => {
    req.session.destroy(error => {
        if (error) {
            res.send("No se pudo cerrar la sesion")
        } else {
            res.redirect("/login")
        }
    });
}

export const ForgotController = async (req, res) => {
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
}