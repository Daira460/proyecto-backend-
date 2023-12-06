import express from "express";
import ProductManager from "./components/ProductManager.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const productManager = new ProductManager('data.json');

const PORT = 4000;

app.get('/products', async (req, res) => {
    const limit = parseInt(req.query.limit);
    const products = await productManager.getProducts();

    if (!limit) return res.send(products);

    res.send(products.slice(0, limit));
});

app.get('/products/:pid', async (req, res) => {
    const pid = parseInt(req.params.pid);
    const resultado = await productManager.getProductById(pid);

    if (resultado.code === 200) {
        res.status(200).send(resultado.products);
    } else {
        res.status(404).send({ status: 404, message: 'Producto no encontrado' });
    }
});

app.post('/products', async (req, res) => {
    const { title, description, price, thumbnail, code, stock } = req.body;
    const respuesta = await productManager.addProduct({ title, description, price, thumbnail, code, stock });

    res.status(respuesta.code).send(respuesta);
});

app.put('/products/:pid', async (req, res) => {
    const pid = parseInt(req.params.pid);
    const { title, description, price, thumbnail, code, stock } = req.body;
    const respuesta = await productManager.updateProduct(pid, { title, description, price, thumbnail, code, stock });

    res.status(respuesta.code).send(respuesta);
});

app.delete('/products/:pid', async (req, res) => {
    const pid = parseInt(req.params.pid);
    const respuesta = await productManager.deleteProduct(pid);

    res.status(respuesta.code).send(respuesta);
});

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});

export default App;