class ProductManager {
    #products;
    #idCounter = 1;
  
    constructor() {
      this.#products = [];
    }
  
    getProducts() {
      return this.#products;
    }
  
    addProduct(title, description, price, thumbnail, code, stock) {
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.error("Todos los campos son obligatorios");
        return;
      }
  
      if (this.#products.some(product => product.code === code)) {
        console.error("Ya existe un producto con el mismo código");
        return;
      }
  
      const newProduct = {
        id: this.#idCounter++,
        title,
        description,
        price,
        thumbnail,
        code,
        stock
      };
  
      this.#products.push(newProduct);
      console.log("Producto agregado:", newProduct);
  
      return newProduct;
    }
  
    getProductById(id) {
      const product = this.#products.find(p => p.id === id);
  
      if (product) {
        return product;
      } else {
        console.error("Producto no encontrado");
      }
    }
  }
  
  const productManager = new ProductManager();
  
  console.log("Productos al inicio:", productManager.getProducts());
  productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
  console.log("Productos después de agregar uno:", productManager.getProducts());
  productManager.addProduct("otro producto", "Este es otro producto", 150, "Otra imagen", "def456", 30);
  const productIdToFind = 1;
  const foundProduct = productManager.getProductById(productIdToFind);
  console.log("Producto encontrado:", foundProduct);
  
  
  
  
  
  
  
  