import mongoose from "mongoose";
import productModel from "../src/dao/models/products.models.js";
import ProductManager from "../src/dao/db-managers/product.manager.js";
import Assert from "assert"
import { options } from "../src/config/options.js";

//conexión a base de datos//
mongoose.connect(options.mongoDB.TEST)

const assert = Assert.strict;

//contexto describe de la clase products//

describe("Testing para la clase Porducts dao", () => {
    before(async function () {
        await mongoose.connect(options.mongoDB.TEST)
        this.timeout(5000)
        this.manager = new ProductManager()
    })

    // beforeEach(async function () {
    //     await productModel.deleteMany();
    // })

    it("el metodo get de la clase Products debe devolver un objeto con los productos de la BD", async function () {
        const result = await this.manager.getProducts();
        console.log(result)
        //validacion para saber si lo que obtengo es lo correcto//
        assert.strictEqual(typeof (result) == "object" ? true : false, true); //lo que hace es corroborar si el tipo de dato de result es objeto, si lo es devuelve true, y como criterio para pasar la prueba (segundo termino) defino que la respuesta debe ser true. Entonces si el primer termino es objeto devuelve true (primer termino), y si la respuesta es true (segundo termino) entonces pasa la prueba.
    })
});
