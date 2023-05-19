import passport from "passport";
import LocalStrategy from "passport-local";
import userModel from "../dao/models/user.models.js";
import { createHash, isValid } from "../utils.js";
import GithubStrategy from "passport-github2";
import jwt from "passport-jwt";
import { CartManager } from "./persistance.js";

const cart = new CartManager;
const initializePassport = () => { //passport trabaja con username y password, pero yo habia usado email, entonces lo que hago en la estrategia es asignar el dato de email ausername
    passport.use("signupStrategy", new LocalStrategy(// signupStrategy es el nombre para llamar y usar esta estrategia
        {
            usernameField: "email",//esto es para indicarle que el username que passport necesita se lo va a dar el campo email de mi formulario
            passReqToCallback: true, //Localstrategy solo requiere username y password, pero esta propiedad me permite pasar otra información adicional que yo tenga de mis formularios, como nomrbe, etc.
        },
        async (req, username, password, done) => {
            try {
                const { name, last_name, age } = req.body; //aca paso todas las variables que no sea username(email) y password que vengan de mi formulario
                const user = await userModel.findOne({ email: username }) //porque passport lo llama username es lo que declaramos en la linea 9
                if (user) { //si ya existe en la BD arrojo false al done
                    return done(null, false) //done(Error,payload)
                }
                //si el usuario no existe
                //ferificacion del mail para saber si es admin o user
                let rol = "user"; //poe defecto es user;
                if (username.endsWith("@coder.com")) {//si el mail termina en @coder.com el rol toma el valor de admin
                    rol = "admin"
                }
                const NewUserData = {
                    name,
                    last_name,
                    age,
                    email: username,
                    password: createHash(password),
                    rol, //por default se crea como user según el userModel
                    cart: await cart.addCart(),
                }
                const newUser = await userModel.create(NewUserData);
                return done(null, newUser) //el primer parametro del done es si hubo error, el segundo es lo que devuelve, en este caso el usuario creado
            } catch (error) {
                return done(error)
            }
        }
    ));

    //Estrategia de login con passport-local

    passport.use("loginStrategy", new LocalStrategy(
        {
            usernameField: "email",
            passReqToCallback: true,
        },
        async (username, password, done) => {
            try {
                const user = await userModel.findOne({ email: username })
                if (!user) {
                    return done(null, false);
                }                //el usuario existe entonces valido al contraseña
                if (!isValid(user, password)) return done(null, false)  //la contraseña no es valida
                return done(null, user);
            } catch (error) {
                return done(error)
            }
        }
    ));

    //Estretegia para autenticar usuarios usando github// passport.use(nombre de le estretegia, función)
    passport.use("githubSignup", new GithubStrategy(
        {
            clientID: "Iv1.eab6f771ead66130",
            clientSecret: "9f7da6bf7fe86e085ae7a5a1755773ceaf00476a",
            callbackURL: "http://localhost:8080/api/session/github-callback"
        },
        async (accessToken, refreshToken, profile, done) => { //primer parametro para acceder el token, luego mantener la sesion activa, profile es el que lleva la info del usuario y done la que da el resultado
            try {
                console.log("profile", profile);
                const userExists = await userModel.findOne({ email: profile.username });
                if (userExists) {
                    return done(null, userExists);
                } else {
                    const newUser = {
                        name: profile.displayName,
                        email: profile.username,
                        password: createHash(profile.id), //uso el id de github para crear la contraseña
                        rol: "user",
                        cart: await cart.addCart()
                    };
                    const userCreated = await userModel.create(newUser);
                    return done(null, userCreated);
                }
            } catch (error) {
                return done(error)
            }
        }
    ))

    //serializar y deserializar usuarios//

    passport.serializeUser((user, done) => {
        done(null, user._id)
    });

    passport.deserializeUser(async (id, done) => {
        const user = await userModel.findById(id);
        return done(null, user);
    });
}

//     //Passport no puede trabajar bien con cookies, osea no puede retirar la info de la cookie, entonces hago una función que se encargue de eso

//     const jwtStrategy = jwt.Strategy;
//     const Extractjwt = jwt.ExtractJwt // peromite extraer el token de cookies, headers, aprams o body

//     passport.use("jwt", new jwtStrategy(
//         {

//         }
//     ))
// }

// const cookieExtractor = (req) => {
//     let token = null //si no hay token es null
//     if (req && req.cookies) {
//         token = req.cookies["token-cookies"]
//     }
//     return token;
// }

export { initializePassport };