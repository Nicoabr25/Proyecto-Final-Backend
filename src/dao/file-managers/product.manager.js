import fs from "fs";
import { __dirname } from "../../utils.js"
import { nextID } from "./utilidades.js";

// const fs = require("fs");

const path = __dirname + "/dao/json/products.json"
class ProductManager {
  ;

  constructor() {
    console.log("Trabajando con FileSystem")
  }


  async getProducts() {
    try {
      const products = await fs.promises.readFile(path, "utf-8");
      return JSON.parse(products);
    } catch (error) {
      return [];
    }
  }

  async getProductbyId(id) {
    const products = await this.getProducts();
    const productsFilter = products.find((prod) => prod.id == id);
    if (!productsFilter) {
      console.log("Producto no encontrado");
    } else {
      return productsFilter;
    }
  }

  async addProduct(title, description, price, thumbnail, code, stock, category, status) {
    const products = await this.getProducts();
    // const contador = await this.Contador();

    const newProduct = {
      //id: contador,title,description,price,thumbnail,code,stock,category, status,
      id: nextID(products),
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      category,
      status,
    };
    let repetido = products.find((prod) => prod.code == code);
    if (!title || !price || !thumbnail || !code || !stock) {
      console.log("Parametros faltantes");
    } else {
      if (!repetido) {
        await fs.promises.writeFile(path, JSON.stringify([...products, newProduct]));
        return (`El producto con el código: ${code} se ha agregado con exito`);
      } else {
        throw new Error;
      }
    }
  }

  async updateProduct(id, propModify) {
    //se pasa un id y un objeto con las propiedades a modificar
    const products = await this.getProducts(); //obtengo los productos del archivo
    let aux = products.find((prod) => prod.id == id); //busco el producto a modificar
    if (!aux) {
      console.log(`El producto con id: ${id} no se encuentra en la base de datos`)
      throw new Error;
    } else {
      if (Object.keys(propModify).includes("id")) {
        //chequeo que no se haya pasado el id como variable a modificar ya que no se puede
        throw new Error;//si incluye id tira error
      } else {
        if (Object.keys(propModify).includes("price")) { //si dentro del body paso price, lo que hago es transformarlo de texto a nuemro
          propModify.price = parseInt(propModify.price)
        }
        if (Object.keys(propModify).includes("stock")) {
          propModify.stock = parseInt(propModify.stock)
        }
        aux = { ...aux, ...propModify };
        let newArray = products.filter((prod) => prod.id !== id); //obtengo la lista de todos los productos menos el modificado
        newArray = [...newArray, aux]; // armo el array de productos con los productos viejos y el nuevo modificado
        await fs.promises.writeFile(path, JSON.stringify(newArray)); //reescribo el archivo
        console.log("Modificación exitosa");
      }
    }
  }

  async deleteProduct(id) {
    const products = await this.getProducts();
    const verificacion = products.some(prod => prod.id == id)
    if (!verificacion) {
      throw new Error;
    } else {
      const aux = products.filter((prod) => prod.id !== id);
      await fs.promises.writeFile(path, JSON.stringify(aux)); //reescribo el archivo
      console.log(`Se ha eliminado el producto con el id : ${id}`);
    }
  }
}
///Para eliminar el archivo
async function eliminarArchivo(path) {
  await fs.promises.unlink(path);
}

export default ProductManager;
