import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";
import { Link } from "react-router-dom";
import "./ShippingAddressScreen.css";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingAddressScreen = (props) => {

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart
  if(!userInfo){
    props.history.push('/signin');
  };

  const [firstName, setFirstName] = useState(shippingAddress.firstName);
  const [lastName, setLastName] = useState(shippingAddress.lastName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [state, setState] = useState(shippingAddress.state);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  // const redirect = props.location.search
  //   ? props.location.search.split("=")[1]
  //   : "/";

  const dispatch = useDispatch();
  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(saveShippingAddress({ firstName, lastName, address, city, state, postalCode, country }));
    props.history.push('/payment');
  };

  // useEffect(() => {
  //   if (userInfo) {
  //     props.history.push(redirect);
  //   }
  // }, [props.history, redirect, userInfo]);

  return (
    <div className="shippingScreen">
      <CheckoutSteps step1 step2 />
      <form className="shippingScreen__form" onSubmit={submitHandler}>
        <div>
          <h1>Shipping Address</h1>
        </div>

        <div className="row">
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              placeholder="Enter First Name"
              required
              onChange={(event) => setFirstName(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="name"
              placeholder="Last Name"
              required
              onChange={(event) => setLastName(event.target.value)}
            />
          </div>
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="name"
            placeholder="Last Name"
            required
            onChange={(event) => setAddress(event.target.value)}
          />
        </div>
        <div className="row">
          <div>
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              placeholder="City"
              required
              onChange={(event) => setCity(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              placeholder="State"
              required
              onChange={(event) => setState(event.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div>
            <label htmlFor="postalCode">Postal Code</label>
            <input
              type="text"
              id="city"
              placeholder="City"
              required
              onChange={(event) => setPostalCode(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              placeholder="Country"
              required
              onChange={(event) => setCountry(event.target.value)}
            />
          </div>
        </div>
        <div>
          <label />
          <button className="shippingScreen__button" type="submit">
            Continue
          </button>
        </div>
        <div>
          <label />
          <div>
            Continue Shopping<Link to="/">Go to Sign In</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ShippingAddressScreen;
