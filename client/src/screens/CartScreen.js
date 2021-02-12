import React from 'react';
import './CartScreen.css';
import { Link } from "react-router-dom";

const CartScreen = (props) => {

    const productId = props.match.params.id;
    const quantity = props.location.search ? Number(props.location.search.split('=')[1]) : 0;

    return (
        <div className='cartscreen'>
            <Link to="/">
                <p>Back to results</p>
            </Link>
            <h1>Cart SCREEN</h1>
            <p>ADD TO CART </p>
            <p>ProductId: {productId}</p>
            <p>Quantity: {quantity}</p>
        </div>
    )
}

export default CartScreen;
