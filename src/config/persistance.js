import FileProductManager from "../dao/file-managers/product.manager.js"
import FileCartManager from "../dao/file-managers/cart.manager.js"
import DbProductManager from "../dao/db-managers/product.manager.js"
import DbCartManager from "../dao/db-managers/cart.manager.js"


const config = {
    persistenceType: "db"
};

let ProductManager, CartManager;

if (config.persistenceType === "db") {
    ProductManager = DbProductManager;
    CartManager = DbCartManager;
} else if (config.persistenceType === "file") {
    ProductManager = FileProductManager;
    CartManager = FileCartManager;
} else {
    throw new Error("No se conoce el tipo de persistencia")
}

export { ProductManager, CartManager }