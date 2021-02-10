import express from 'express';
import data from './data.js';

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/products', (request, response) => {
    response.send(data.products)
});

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

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}.  BOOOM!!!`)
});