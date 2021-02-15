import React from 'react';
import './Header.css';
import { Icon } from '@iconify/react';
import shoppingCartSign from '@iconify-icons/el/shopping-cart-sign';
import loginOutlined from '@iconify-icons/ant-design/login-outlined';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';


const Header = () => {

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

    return (
        <div className='header'>
          <div className="row">
            <Link to="/">
              <img
                className="header__logo"
                src="https://inforrm.files.wordpress.com/2017/01/e-commerce.png"
                alt="e-commerce-logo"
              />
            </Link>
            <Link to="/" className="header__brand">
              e-Commerce
            </Link>
          </div>
          <div className="search">
            <input className="search__input" type="text" />
              <button>Search</button>
            </div>
            <div>
              <Link to="/cart">
                <Icon className='shopping__icon' icon={shoppingCartSign} />
                {cartItems.length > 0 && (
                  <span className='header__numberOfItems'>
                    {cartItems.length}
                  </span>
                )}
              </Link>
              <Link to="/signin"><Icon className='signin__icon' icon={loginOutlined} /></Link>
            </div>
        </div>
    )
}

export default Header
