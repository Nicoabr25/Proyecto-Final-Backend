import FileProductManager from "../dao/file-managers/product.manager.js"
import FileCartManager from "../dao/file-managers/cart.manager.js"
import DbProductManager from "../dao/db-managers/product.manager.js"
import DbCartManager from "../dao/db-managers/cart.manager.js"
import { options } from "./options.js"
import mongoose from "mongoose"

const config = {
    persistenceType: options.server.persistance,
    enviroment: options.mongoDB.ENVIRONMENT,
};

let ProductManager, CartManager;

if (config.persistenceType === "mongo") {
    ProductManager = DbProductManager;
    CartManager = DbCartManager;
    if (config.enviroment === "PRODUCTION") {
        try {
            mongoose.connect(options.mongoDB.URL).then((conn) => {
                console.log("Connected to DB!!!")
            })
        } catch (error) {
            console.log("No se pudo conectar a la base de datos")
        }
    } else if (config.enviroment === "TEST") {
        try {
            mongoose.connect(options.mongoDB.TEST).then((conn) => {
                console.log("Connected to TEST DB!!!")
            })
        } catch (error) {
            console.log("No se pudo conectar a la base de datos de ´rueba")
        }
    } else {
        console.log("No se conoce el tipo de ambiente, pruebe con TEST para pruebas o PRODUCTION para uso normal")
    }
} else if (config.persistenceType === "file") {
    ProductManager = FileProductManager;
    CartManager = FileCartManager;
    try {
        console.log("Trabajando con archivos")
    } catch (error) {
        console.log("No se peude trabajar con archivos")
    }
} else {
    throw new Error("No se conoce el tipo de persistencia")
}

export { ProductManager, CartManager }