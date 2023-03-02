import fs from "fs";
// const fs = require("fs");

class ProductManager {
  #path;

  constructor(path) {
    this.#path = path;
  }

  async Contador() {
    const products = await this.getProducts();
    let id = products.map((prods) => prods.id); //id contiene todos los Ids de produscts
    let contador = Math.max(...id); //obtengo el mayor id
    if (contador == -Infinity) {
      //Math.max devuelve el mayor número o -infinity si el array esta vacío
      return 1;
    } else {
      return ++contador; //devuelve Contador (ID mayor) +1
    }
  }

  async getProducts() {
    try {
      const products = await fs.promises.readFile(this.#path, "utf-8");
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
    const contador = await this.Contador();

    const newProduct = {
      //id: contador,title,description,price,thumbnail,code,stock,category, status,
      id: contador,
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
        await fs.promises.writeFile(this.#path, JSON.stringify([...products, newProduct]));
        console.log(
          `El producto con el código: ${code} se ha agregado con exito`
        );
      } else {
        console.log("El producto ya se encuentra en la lista");
      }
    }
  }

  async updateProduct(id, propModify) {
    //se pasa un id y un objeto con las propiedades a modificar
    const products = await this.getProducts(); //obtengo los productos del archivo
    let aux = products.find((prod) => prod.id == id); //busco el producto a modificar
    if (!aux) {
      console.log(
        `El producto con id: ${id} no se encuentra en la base de datos`
      );
    } else {
      if (Object.keys(propModify).includes(id)) {
        //chequeo que no se haya pasado el id como variable a modificar ya que no se puede
        console.log("No se puede modificar el id");
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
        await fs.promises.writeFile(this.#path, JSON.stringify(newArray)); //reescribo el archivo
        console.log("Modificación exitosa");
      }
    }
  }

  async deleteProduct(id) {
    const products = await this.getProducts();
    const verificacion = products.some(prod => prod.id == id)
    if (!verificacion) {
      return ("No existe ese producto")
    } else {
      const aux = products.filter((prod) => prod.id !== id);
      await fs.promises.writeFile(this.#path, JSON.stringify(aux)); //reescribo el archivo
      console.log(`Se ha eliminado el producto con el id : ${id}`);
    }
  }
}

///Para eliminar el archivo
async function eliminarArchivo(path) {
  await fs.promises.unlink(path);
}

// / Prueba
// async function prueba() {
//   //   title,price,thumbnail,code,stock
//   //   await eliminarArchivo('./products.json')
//   const manager1 = new ProductManager("./products.json");
//   await manager1.addProduct("Remera", 3000, "img", 500, 10);
//   await manager1.addProduct("Buzo", 5000, "img", 600, 5);
//   await manager1.addProduct("Pantalon", 5000, "img", 700, 5);
//   await manager1.addProduct("zapatilla", 4000, "img", 600, 2);
//   console.table(await manager1.getProducts());
//   console.table(await manager1.getProductbyId(0));
//   console.table(await manager1.getProductbyId(2));
//   await manager1.deleteProduct(2);
//   console.table(await manager1.getProducts());
//   await manager1.addProduct("Sweater", 3000, "img", 800, 2);
//   console.table(await manager1.getProductbyId(2));
//   console.table(await manager1.getProductbyId(3));
//   console.table(await manager1.getProducts());
//   await manager1.updateProduct(2, { title: "Gorra", price: 10400 });
//   console.table(await manager1.getProducts());
//   await manager1.addProduct("Remera", 3000, "img", 500, 10);
//   await manager1.addProduct("Buzo", 20, "img", 600, 5);
// }
// prueba();

export default ProductManager;
