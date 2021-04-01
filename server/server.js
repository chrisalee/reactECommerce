import express from 'express';
import mongoose from 'mongoose';
import data from './data.js';
import userRouter from './routers/userRouter.js';


const app = express();
mongoose.connect('mongodb://localhost/e-commerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

const port = process.env.PORT || 5000;

app.get('/api/products', (request, response) => {
    response.send(data.products)
});

app.use('/api/users', userRouter)

app.get('/api/products/:id', (request, response) => {
    const product = data.products.find( prod => prod._id === request.params.id )
    if(product) {
        response.send(product);
    } else {
        response.status(404).send({message: "Product not found"})
    }
});

app.get('/', (request, response) => {
    response.send(`Server is ready`)
});

app.use((err, request, response, next) => {
    response.status(500).send({message: err.message});
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}.  BOOOM!!!`)
});