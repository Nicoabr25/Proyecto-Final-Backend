import productModel from "../models/products.models.js";
import cartModel from "../models/carts.models.js";


class ProductManager {

  constructor() {
    console.log("Trabajando con DB!")
  }

  async getProducts(limit, page) {
    let limitOp = limit ? limit : 4;
    let pageOp = page ? page : 1;
    try {
      const products = await productModel.paginate({}, { limit: limitOp, lean: true, page: page ?? pageOp })
      return products;
    } catch (error) {
      return [];
    }
  }

  // async getProducts(limit, page, sort, queryKey, queryParam) {
  //   let limitOp = limit ? limit : 10;
  //   let pageOp = page ? page : 1;
  //   let sortOp = sort ? { price: sort } : null;
  //   let queryKeyOp = queryKey
  //   let queryParamsOp = queryParam;
  //   let Parametros = { limit: limitOp, lean: true, page: pageOp, sort: sortOp }
  //   let querySearch;
  //   if (queryKeyOp && queryParamsOp) {
  //     querySearch = { [queryKeyOp]: [queryParamsOp] }
  //   } else {
  //     { }
  //   }
  //   try {
  //     const products = await productModel.paginate(querySearch, Parametros)
  //     return products;
  //   } catch (error) {
  //     return [];
  //   }
  // }


  async getProductbyId(id) {
    const productsFilter = await productModel.findById(id);
    if (!productsFilter) {
      console.log("Producto no encontrado");
    } else {
      return productsFilter;
    }
  }

  async addProduct(title, description, price, thumbnail, code, stock, category, status) {

    const product = { title, description, price, thumbnail, code, stock, category, status }
    const result = await productModel.create(product);
    console.log("Producto Agregado!")
    return result;
  }

  async updateProduct(id, newinfo) {
    try {
      const updateProduct = await productModel.findOneAndReplace({ _id: id }, newinfo)
      return updateProduct;
    } catch (error) {
      console.log(`El producto con id: ${id} no se encuentra en la base de datos`)
      throw new Error;
    }
  }


  async deleteProduct(id) {
    try {
      const result = await productModel.deleteOne({ _id: id });
      return result
    } catch (error) {
      console.log("No se pudo eliminar el producto")
      throw new Error;
    }
  }

  async reduceStock(id, stock) {
    try {
      const productToUpdate = await productModel.findById(id)
      if (productToUpdate.stock < stock) {
        return ("El stock del producto es menor que la cantidad solicitada ")
      } else {
        const newStock = Number(productToUpdate.stock) - Number(stock)
        const newinfo = {
          title: productToUpdate.title,
          description: productToUpdate.description,
          price: productToUpdate.price,
          thumbnail: productToUpdate.thumbnail,
          code: productToUpdate.code,
          stock: newStock,
          category: productToUpdate.category,
          status: productToUpdate.status
        }
        this.updateProduct(id, newinfo)
      }
    } catch (error) {
      throw new Error
    }
  }
}


export default ProductManager;
