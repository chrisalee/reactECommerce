import express from 'express';
import mongoose from 'mongoose';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';

const app = express();
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/e-commerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

const port = process.env.PORT || 5000;

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.get('/', (request, response) => {
    response.send(`Server is ready`)
});

app.use((err, request, response, next) => {
    response.status(500).send({message: err.message});
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}.  BOOOM!!!`)
});