import { promises as fs } from "fs";

class ProductManager {
  constructor() {
    this.path = "./productos.txt";
    this.products = [];
  }

  static id = 0;

  addProduct = async (title, description, price, thumbnail, code, stock) => {
    ProductManager.id++;
    let newProduct = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      id: ProductManager.id,
    };
    this.products.push(newProduct);

    await fs.writeFile(this.path, JSON.stringify(this.products));
  };

  readProducts = async () => {
    let respuesta = await fs.readFile(this.path, "utf-8");
    return JSON.parse(respuesta);
  };

  getProductsById = async (id) => {
    let products = await this.readProducts();
    return products.find((product) => product.id === id);
  };

  deleteProductById = async (id) => {
    let products = await this.readProducts();
    let productFilter = products.filter((product) => product.id !== id);
    await fs.writeFile(this.path, JSON.stringify(productFilter));
    console.log("Producto Eliminado");
  };

  updateProduct = async ({ id, ...product }) => {
    await this.deleteProductById(id);
    let productsOld = await this.readProducts();
    let productsModified = [{ ...product, id }, ...productsOld];
    await fs.writeFile(this.path, JSON.stringify(productsModified));
  };
}

const productos = new ProductManager();

/*productos.addProduct("Titulo1", "Descripcion1", 1000, "Imagen1", "abc121", 1);
productos.addProduct("Titulo2", "Descripcion2", 2000, "Imagen2", "abc122", 2);
productos.addProduct("Titulo3", "Descripcion3", 3000, "Imagen3", "abc123", 3);
productos.addProduct("Titulo4", "Descripcion4", 3000, "Imagen4", "abc124", 4);
productos.addProduct("Titulo5", "Descripcion5", 3000, "Imagen5", "abc125", 5);
productos.addProduct("Titulo6", "Descripcion6", 3000, "Imagen6", "abc126", 4);
productos.addProduct("Titulo7", "Descripcion7", 3000, "Imagen7", "abc127", 3);
productos.addProduct("Titulo8", "Descripcion8", 3000, "Imagen8", "abc128", 2);
productos.addProduct("Titulo9", "Descripcion9", 3000, "Imagen9", "abc129", 1);
productos.addProduct("Titulo10", "Descripcion10", 3000, "Imagen10", "abc130", 2);*/

const allProducts = await productos.readProducts();
console.log(allProducts);


