import multer from "multer";
import path from "path"
import { __dirname } from "../utils.js";

// const storage = multer.diskStorage({
//     destination: "./public/img", //destino del archivo
//     filename: function (req, file, cb) { // para mantener el nombre del archivo original, agrego una funcion que tome como parametro, la reques, el archivo y un callback para retornar el nombre del archivo (para poder leerlo tengo que acceder primero al archivo.)
//         cb(null, file.originalname); //primer parametro, protencial error, segundo nombre del archivo
//     }
// });

// const uploader = multer({ storage }); // generamos un uploader, que ejecuta multer con las configuraicon de storage

// export default uploader;

//Crear un filtro para validar que todos los campos son correctos//

const ValidFields = (body) => {
    const { name, email, password } = body;
    if (!name || !email || !password) {
        return false
    } else {
        return true
    }
};

//filtro para validar los campos antes de cargar la imagen

const multerFilterProfile = (req, file, cb) => {
    const isValidData = ValidFields(req.body)
    if (!isValidData) {
        cb(null, false)
    } else {
        cb(null, true)
    }
};

//configuracion apra guardar imagenes de usuarios//

const profileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "/files/users/images"))
    },
    //nombre del archivo//
    filename: function (req, file, cb) {
        cb(null, `${req.body.email}-perfil-${file.originalname}`) //el archivo se guarda como el email + perfil + el nombre del archivo original. file.originalname es el nombre del archivo que sube el usuario y contiene la extension del mismo, por eso conviene ponerlo a lo ultimo 
    }
});

//crear uploader para subir las imagenes//

export const uploaderProfile = multer({ storage: profileStorage, fileFilter: multerFilterProfile });

//configuracion apra guardar los documentos de usuarios//

const documentStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "/files/users/documents"))
    },
    //nombre del archivo//
    filename: function (req, file, cb) {
        cb(null, `${req.session.email}-documento-${file.originalname}`) //el archivo se guarda como el email + documento + el nombre del archivo original. file.originalname es el nombre del archivo que sube el usuario y contiene la extension del mismo, por eso conviene ponerlo a lo ultimo 
    }
});
//crear uploader de documentos//

export const uploaderDocuments = multer({ storage: documentStorage });

//configuracion para guardarimagenes de productos s//

const productStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "/files/products/images"))
    },
    //nombre del archivo//
    filename: function (req, file, cb) {
        cb(null, `${req.body.title}-imagen-${file.originalname}`) //el archivo se guarda como el codigo + imagen + el nombre del archivo original. file.originalname es el nombre del archivo que sube el usuario y contiene la extension del mismo, por eso conviene ponerlo a lo ultimo 
    }
});
//crear uploader de documentos//

export const uploaderProduct = multer({ storage: productStorage });