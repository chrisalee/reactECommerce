import React, { useEffect } from 'react';
import './CartScreen.css';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';

const CartScreen = (props) => {

    const productId = props.match.params.id;
    const quantity = props.location.search ? Number(props.location.search.split('=')[1]) : 0;
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart; 
    const dispatch = useDispatch();

    useEffect(() => {
        if(productId) {
            dispatch(addToCart(productId, quantity));
        }
    }, [dispatch, productId, quantity]);

    const removeFromCartHandler = (id) => {
        //delete action
    };

    const checkoutHandler = () => {
        //go to checkout
    };

    return (
        <div className='cartscreen row top'>
            <div className="cartScreen__col-2">
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? 
                <MessageBox>
                    Cart is empty
                    <Link to='/'>Go Shopping</Link>
                </MessageBox> : 
                (
                    <ul>
                        {
                            cartItems.map((item) => (
                                <li key={item.product}>
                                    <div className="row">
                                        <div>
                                            <img 
                                                className='cartScreen__image' 
                                                src={item.image} 
                                                alt={item.name}/>
                                        </div>
                                        <div >
                                            <Link to={`/product/${item.product}`} className='cartScreen__name'>{item.name}</Link>
                                        </div>
                                        <div>
                                            <select value={item.quantity} onChange={event => dispatch(addToCart(item.product), Number(event.target.value))}>
                                                {
                                                    [...Array(item.countInStock).keys()].map(qty => (
                                                        <option key={qty + 1} value={qty + 1}>{qty + 1}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div>
                                            <p>${item.price}</p>
                                        </div>
                                        <div>
                                            <button className='cartScreen__button' type='button' onClick={() => removeFromCartHandler(item.product)}>Remove From Cart</button>
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                )}
            </div>

            <div className="cartScreen__cardCol-1">
                <div className="cartScreen__card">
                    <ul>
                        <li>
                            <h2>Subtotal ({cartItems?.reduce((accumulator, currentItem) => accumulator + currentItem.quantity, 0)} items) : ${cartItems.reduce((accumulator, currentItem) => accumulator + currentItem.price * currentItem.quantity, 0)}</h2>
                        </li>
                        <li>
                            <button type='button' onClick={checkoutHandler} className='cartScreen__checkoutButton' disabled={cartItems.length === 0}>Proceed To Checkout</button>
                        </li>
                    </ul>
                </div>
            </div>
            
        </div>
    )
}

export default CartScreen;
