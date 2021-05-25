import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import productRouter from "./routers/productRouter.js";
import userRouter from "./routers/userRouter.js";
import orderRouter from "./routers/orderRouter.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/e-commerce", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const port = process.env.PORT || 5000;

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use('/api/orders', orderRouter);
app.get('/api/config/paypal', (request, response) => {
  response.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});
app.get("/", (request, response) => {
  response.send(`Server is ready`);
});

app.use((error, request, response, next) => {
  response.status(500).send({ message: error.message });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}.  BOOOM!!!`);
});
