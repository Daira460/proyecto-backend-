import crypto from "crypto";
import utils from "../utils.js";

class CartManager {
  static carts;

  constructor(path) {
    this.path = path;
    this.carts = [];
  }

  async addCart() {
    try {
      const data = await utils.readFile(this.path);
      this.carts = data?.length > 0 ? data : [];
      const id = crypto.randomUUID();

      const newCart = {
        id,
        timestamp: Date.now(),
        products: [],
      };

      this.carts.push(newCart);

      await utils.writeFile(this.path, this.carts);
      return newCart;
    } catch (error) {
      console.error("Error adding cart:", error.message);
      throw error;
    }
  }

  async getCarts() {
    try {
      const data = await utils.readFile(this.path);
      this.carts = data;
      return data?.length > 0 ? this.carts : "No hay registros aún";
    } catch (error) {
      console.error("Error getting carts:", error.message);
      throw error;
    }
  }

  async getCartById(id) {
    try {
      const data = await utils.readFile(this.path);
      this.carts = data?.length > 0 ? data : [];
      const cart = this.carts.find((dato) => dato.id === id);

      if (cart) {
        return cart;
      } else {
        throw new Error("No existe el carrito solicitado");
      }
    } catch (error) {
      console.error("Error getting cart by id:", error.message);
      throw error;
    }
  }

  async addProductToCart(cid, pid) {
    try {
      const cart = await this.getCartById(cid);
      const { products } = cart;
      const productIndex = products.findIndex((product) => product.product === pid);

      if (productIndex !== -1) {
        products[productIndex].quantity++;
      } else {
        products.push({
          product: pid,
          quantity: 1,
        });
      }
      
      await this.updateCart(cart);
      return cart;
    } catch (err) {
      console.error("Error adding product to cart:", err.message);
      throw err;
    }
  }

  async updateCart(cart) {
    try {
      const { id } = cart;
      const carts = await this.getCarts();
      const cartToUpdateIndex = carts.findIndex((carro) => carro.id === id);
      carts.splice(cartToUpdateIndex, 1, cart);
      
      await utils.writeFile(this.path, carts);
      return true;
    } catch (error) {
      console.error("Error updating cart:", error.message);
      throw error;
    }
  }
}

export { CartManager };
