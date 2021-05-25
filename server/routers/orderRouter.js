import express, { request, response } from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import { isAuth } from "../utils.js";

const orderRouter = express.Router();

orderRouter.get(
  '/myOrders',
  isAuth,
  expressAsyncHandler(async(request, response) => {
    const orders = await Order.find({ user: request.user._id });
    response.send(orders);
  })
);

orderRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (request, response) => {
    if (request.body.orderItems.length === 0) {
      response.status(400).send({ message: "Cart is empty" });
    } else {
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
      response
        .status(201)
        .send({ message: "New Order Created", order: createdOrder });
    }

    response.send(orders);
  })
);

orderRouter.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (request, response) => {
    const order = await Order.findById(request.params.id);
    if (order) {
      response.send(order);
    } else {
      response.status(404).send({ message: "Order Not Found" });
    }
  })
);

orderRouter.put(
  "/:id/payment",
  isAuth,
  expressAsyncHandler(async (request, response) => {
    const order = await Order.findById(request.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: request.body.id,
        status: request.body.status,
        update_time: request.body.update_time,
        email_address: request.body.email_address,
      };
      const updatedOrder = await order.save();
      response.send({ message: 'Order Paid', order: updatedOrder });
    } else {
      response.status(404).send({ message: "Order Not Found" });
    }
  })
);

export default orderRouter;
