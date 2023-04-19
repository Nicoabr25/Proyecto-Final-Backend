import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


//Pra poder usar __dirname si usamos ESM


//Hash// bctypt permite usal la funcion compare para comparar la contraseña que ingresa el usuario en el front contra el hash de la contraseña guardado en la BBDD, de esta forma me ahorro de tener que hashear la contrasela del front y compararla con la de BBDD, lo hace automaticamente usando compare

const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync())
}

const isValid = (user, loginPassword) => {
    return bcrypt.compareSync(loginPassword, user.password); //si la contraseña almacenada en la BBDD y lañ contraseña ingresada haseada coninciden retorna true, sino false
}

export { __dirname, createHash, isValid };