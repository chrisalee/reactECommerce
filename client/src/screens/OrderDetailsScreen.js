import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { detailsOrder, paymentOrder } from "../actions/orderActions";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";
import './OrderDetailsScreen.css';
import { PayPalButton } from 'react-paypal-button-v2';
import { ORDER_PAYMENT_RESET } from "../constants/orderConstants";

const OrderDetailsScreen = (props) => {

  const orderId = props.match.params.id;
  const [sdkReady, setSdkReady] = useState(false);
  const orderDetails = useSelector(state => state.orderDetails);
  const { order, loading, error } = orderDetails;
  
  const orderPayment = useSelector(state => state.orderPayment);
  const { loading: loadingPayment, error: errorPayment, success: successPayment } = orderPayment;
  const dispatch = useDispatch();

  

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await Axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = "text/javascript";
      script.scr = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      console.log(data);
      document.body.appendChild(script);
    };
    if(!order || successPayment || (order && order._id !== orderId)) {
      dispatch({ type: ORDER_PAYMENT_RESET });
      dispatch(detailsOrder(orderId));
    } else {
      if(!order.isPaid){
        if(!window.paypal){
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, order, orderId, sdkReady, successPayment]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(paymentOrder(order, paymentResult))
  }

  return loading ? (<Loading />) : error ? (<MessageBox varient='danger'>{error}</MessageBox>) :
  (
    <div className="orderdetailsScreen">
      <h1>Order {order._id}</h1>
      <div className="row top">
        <div className="orderdetailsScreen__col-2">
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
              {
                !order.isPaid && (
                  <li className='orderdetailsScreen__loading'>
                    {!sdkReady ? (<Loading />) : 
                    (
                      <>
                      {errorPayment && <MessageBox varient='danger'>{errorPayment}</MessageBox>}
                      {loadingPayment && <Loading  />}
                      <PayPalButton 
                        amount = {order.totalPrice}
                        onSuccess = {successPaymentHandler}
                      ></PayPalButton>
                      </>
                    )}
                  </li>
                )
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsScreen;
