// app.js
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { router as productsRouter } from './routes/Productsrouter.js';
import { router as cartsRouter } from './routes/Cart.router.js';
import handlebars from 'express-handlebars';
import ProductManager from './components/ProductManager.js';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(__dirname + '/public'));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

const productManager = new ProductManager('productos.json');

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.get('/products', async (req, res) => {
    try {
        const productos = await productManager.getProducts();
        res.render('products', { productos });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error obteniendo productos');
    }
});

app.get('/realtime', async (req, res) => {
    try {
        const productos = await productManager.getProducts();
        res.render('realtime', { productos });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error obteniendo productos para realtime');
    }
});

const PORT = 4000;
const server = http.createServer(app);

const io = new Server(server);

io.on('connection', (socket) => {
    socket.on('addProduct', async (product) => {
        console.log('Adding product:', product);
        try {
            const result = await productManager.addProduct(product);
            const allProducts = await productManager.getProducts();
            result && io.emit('updateProducts', allProducts);
        } catch (err) {
            console.log(err);
        }
    });

    socket.on('deleteProduct', async (id) => {
        try {
            const result = await productManager.deleteProduct(id);
            const allProducts = await productManager.getProducts();
            result && io.emit('updateProducts', allProducts);
        } catch (err) {
            console.log(err);
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});

export { server, io };






