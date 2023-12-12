import crypto from "crypto";
import utils from "../utils.js";

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      throw new Error("Todos los campos son obligatorios");
    }

    try {
      const data = await utils.readFile(this.path);
      this.products = data?.length > 0 ? data : [];
    } catch (error) {
      console.error("Error adding product:", error.message);
      throw error;
    }

    const codeExists = this.products.some((dato) => dato.code === code);

    if (codeExists) {
      throw new Error("El código ya existe. Por favor, verifique.");
    } else {
      const newProduct = {
        id: crypto.randomUUID(),
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
      this.products.push(newProduct);

      try {
        await utils.writeFile(this.path, this.products);
      } catch (error) {
        console.error("Error writing file:", error.message);
        throw error;
      }
    }
  }

  async getProducts() {
    try {
      const data = await utils.readFile(this.path);
      this.products = data;
      return data?.length > 0 ? this.products : "No hay registros aún";
    } catch (error) {
      console.error("Error getting products:", error.message);
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const data = await utils.readFile(this.path);
      this.products = data?.length > 0 ? data : [];
      const product = this.products.find((dato) => dato.id === id);

      if (product) {
        return product;
      } else {
        throw new Error("No existe el producto solicitado");
      }
    } catch (error) {
      console.error("Error getting product by id:", error.message);
      throw error;
    }
  }

  async updateProductById(id, data) {
    try {
      let products = await utils.readFile(this.path);
      this.products = products?.length > 0 ? products : [];

      let productIndex = this.products.findIndex((dato) => dato.id === id);
      if (productIndex !== -1) {
        this.products[productIndex] = {
          ...this.products[productIndex],
          ...data,
        };
        await utils.writeFile(this.path, products);
        return {
          mensaje: "Producto actualizado",
          producto: this.products[productIndex],
        };
      } else {
        throw new Error("No existe el producto solicitado");
      }
    } catch (error) {
      console.error("Error updating product by id:", error.message);
      throw error;
    }
  }

  async deleteProductById(id) {
    try {
      let products = await utils.readFile(this.path);
      this.products = products?.length > 0 ? products : [];
      let productIndex = this.products.findIndex((dato) => dato.id === id);
      if (productIndex !== -1) {
        let product = this.products[productIndex];
        this.products.splice(productIndex, 1);
        await utils.writeFile(this.path, products);
        return { mensaje: "Producto eliminado", producto: product };
      } else {
        throw new Error("No existe el producto solicitado");
      }
    } catch (error) {
      console.error("Error deleting product by id:", error.message);
      throw error;
    }
  }
}

export default ProductManager;

