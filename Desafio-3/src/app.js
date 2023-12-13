import express from "express";
import ProductManager from "./components/ProductManager.js";
import router from "./routes/Productsrouter.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const productManager = new ProductManager('productos.json');

const PORT = 4000;

app.use('/api/products', router);

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});

