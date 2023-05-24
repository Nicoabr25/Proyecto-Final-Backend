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
      const products = await productModel.paginate({}, { limit: 4, lean: true, page: page ?? 1 })
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
}


export default ProductManager;
