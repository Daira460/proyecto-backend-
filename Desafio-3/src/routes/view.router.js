// view.router.js
import { Router } from 'express';
import ProductManager from '../components/ProductManager.js';

const viewsRouter = Router();
const productManager = new ProductManager('./src/productos.json');

viewsRouter.get('/products', async (req, res) => {
  const products = await productManager.getProducts();
  res.render('products', {
    title: 'Listado de productos',
    products: products,
    style: 'css/products.css',
  });
});

viewsRouter.get('/realtime', async (req, res) => {
  const products = await productManager.getProducts();
  res.render('realtime', {
    title: 'Productos en tiempo real',
    products: products,
    style: 'css/products.css',
  });
});

export { viewsRouter };



