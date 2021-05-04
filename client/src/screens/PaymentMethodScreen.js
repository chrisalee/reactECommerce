import React, { useState } from "react";
import "./PaymentMethodScreen.css";
import CheckoutSteps from "../components/CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";

const PaymentMethodScreen = (props) => {
  const cart = useSelector(state => state.cart)
  const { shippingAddress } = cart;
  if(!shippingAddress.address){
    props.history.push('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();
  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push("/placeorder");
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 />
      <form className="paymentmethodScreen__form" onSubmit={submitHandler}>
        <div>
          <h1>Payment Method</h1>
        </div>
        <div>
          <div className='paymentmethodScreen__row'>
            <input
              type="radio"
              id="paypal"
              value="PayPal"
              name="paymentMethod"
              required
              checked
              onChange={(event) => setPaymentMethod(event.target.value)}
            />
            <label htmlFor="paypal">PayPal</label>
          </div>
          <div className='paymentmethodScreen__row'>
            <input
              type="radio"
              id="stripe"
              value="Stripe"
              name="paymentMethod"
              required
              onChange={(event) => setPaymentMethod(event.target.value)}
            />
            <label htmlFor="stripe">Stripe</label>
          </div>
        </div>
        <div>
          <button className="paymentmethodScreen__button" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentMethodScreen;
