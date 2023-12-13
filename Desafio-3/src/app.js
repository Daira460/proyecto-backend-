import express from "express";
import ProductsRouter from "./routes/Productsrouter.js";
import CartsRouter from "./routes/Cart.router.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/products', ProductsRouter);

app.use('/api/carts', CartsRouter);

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});


