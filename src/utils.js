import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { options } from "./config/options.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const Secret_key = "tokenSecretKey"
//Pra poder usar __dirname si usamos ESM


//Hash// bctypt permite usal la funcion compare para comparar la contraseña que ingresa el usuario en el front contra el hash de la contraseña guardado en la BBDD, de esta forma me ahorro de tener que hashear la contrasela del front y compararla con la de BBDD, lo hace automaticamente usando compare

const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync())
}

const isValid = (user, loginPassword) => {
    return bcrypt.compareSync(loginPassword, user.password); //si la contraseña almacenada en la BBDD y lañ contraseña ingresada haseada coninciden retorna true, sino false
}

//genero token con Secret_key usando JWT
const generateToken = (user) => {
    const token = jwt.sign(user, Secret_key, {
        expiresIn: "360s"
    });
    return (token);

}
//genero la función para valdiar el token de forma de middleware para poder usar en medio de las funciones de autenticaciones
const validateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"]; //recibo el token por una peticion post por el header
    if (!authHeader) return res.status(401).send("Acceso no autorizado");
    //bearer token =>split solo para quedarme con el token ["bearer", "token"]
    const token = authHeader.split(" ")[1]; //toma el autoheader y lo corta por el espacio, luego toma el objeto 1 que es Token authHeader = "Bearer Token" => split (" ") => ["bearer", "token"] tomo el [1] => ["token"]
    jwt.verify(token, Secret_key, (err, info) => { //se verifica, el token, la secret key y un callbak que toma si ocurrio un error (es decir no se valido el token) y en info se guarda la informaci+on el tokens
        if (err) return res.status(401).send("Acceso no autorizado");
        req.user = info;
        next();
    });
}
//generar token para email de recuperación de contraseña
const generateEmailToken = (email, expireTime) => {
    const token = jwt.sign({ email }, options.email.token_email, { expiresIn: expireTime })
    return token;
}

const verifyEmailToken = (token) => {
    try {
        const info = jwt.verify(token, options.email.token_email)
        return info.email
    } catch (error) {
        console.log(error.message)
        return null;
    }

}

export { __dirname, createHash, isValid, generateToken, validateToken, generateEmailToken, verifyEmailToken };