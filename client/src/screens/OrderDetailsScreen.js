import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { detailsOrder } from "../actions/orderActions";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";
import './OrderDetailsScreen.css';

const OrderDetailsScreen = (props) => {

  const orderId = props.match.params.id
  const orderDetails = useSelector(state => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsOrder(orderId))
  }, [dispatch, orderId,]);

  return loading ? (<Loading />) : error ? (<MessageBox varient='danger'>{error}</MessageBox>) :
  (
    <div className="orderdetailsScreen">
      <h1>Order {order._id}</h1>
      <div className="row top placeOrderScreen">
        <div className="placeOrderScreen__col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2 className='orderdetailsScreen__cardTitle'>Shipping To</h2>
                <p>
                  <strong>Name:</strong> {order.shippingAddress.firstName}{" "}
                  {order.shippingAddress.lastName}
                  <br />
                  <strong>Address:</strong> {order.shippingAddress.address}
                  <br />
                  {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                  {order.shippingAddress.postalCode}{" "}
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered 
                  ? <MessageBox varient='success'>Delivered At {order.deliveredAt}</MessageBox>
                  : <MessageBox varient='danger'>Your Order has not been delivered</MessageBox>
                }
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong> {order.paymentMethod}
                </p>
                {order.isPaid
                  ? <MessageBox varient='success'>Paid At {order.paidAt}</MessageBox>
                  : <MessageBox varient='danger'>Not Paid</MessageBox>
                }
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Order Items</h2>
                <ul>
                  {order.orderItems.map((item) => (
                    <li key={item.product}>
                      <div className="row">
                        <div>
                          <img
                            className="cartScreen__image"
                            src={item.image}
                            alt={item.name}
                          />
                        </div>
                        <div>
                          <Link
                            to={`/product/${item.product}`}
                            className="cartScreen__name"
                          >
                            {item.name}
                          </Link>
                        </div>
                        <div>
                          <p>
                            ${item.price} X {item.quantity} = $
                            {item.price * item.quantity}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="placeOrderScreen__col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>
                  <div>${order.itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>${order.shippingPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    Taxes <small>(15%)</small>
                  </div>
                  <div>${order.taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <hr />
              <li>
                <div className="row">
                  <div>
                    <strong>Order Total</strong>
                  </div>
                  <div>${order.totalPrice.toFixed(2)}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsScreen;
