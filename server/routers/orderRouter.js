import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { isAuth } from '../utils.js';

const orderRouter = express.Router();

orderRouter.post(
    '/',
    isAuth,
    expressAsyncHandler(async (request, response) => {
        if(request.body.orders.length === 0) {
            response.status(400).send({ message: 'Cart is empty'})
        } else{
            const order = new Order({
                orderItems: request.body.orderItems,
                shippingAddress: request.body.shippingAddress,
                paymentMethod: request.body.paymentMethod,
                itemsPrice: request.body.itemsPrice,
                shippingPrice: request.body.shippingPrice,
                taxPrice: request.body.taxPrice,
                totalPrice: request.body.itemsPrice,
                user: request.user._id,
                
            });
            const createdOrder = await order.save();
            response.status(201).send({ message: 'New Order Created', order: createdOrder })
        }
        
        response.send(orders);
    })
);

export default orderRouter;