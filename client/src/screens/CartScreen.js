import React, { useEffect } from 'react';
import './CartScreen.css';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartActions';

const CartScreen = (props) => {

    const productId = props.match.params.id;
    const quantity = props.location.search ? Number(props.location.search.split('=')[1]) : 0;
    const dispatch = useDispatch();

    useEffect(() => {
        if(productId) {
            dispatch(addToCart(productId, quantity));
        }
    }, [dispatch, productId, quantity])

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
