import React from 'react';
import './Header.css';
import { Icon } from '@iconify/react';
import shoppingCartSign from '@iconify-icons/el/shopping-cart-sign';
import loginOutlined from '@iconify-icons/ant-design/login-outlined';


const Header = () => {
    return (
        <div className='header'>
          <div className="row">
            <a href="/">
              <img
                className="header__logo"
                src="https://inforrm.files.wordpress.com/2017/01/e-commerce.png"
                alt="e-commerce-logo"
              />
            </a>
            <a className="header__brand" href="/">
              e-Commerce
            </a>
          </div>
          <div className="search">
            <input className="search__input" type="text" />
              <button>Search</button>
            </div>
            <div>
              <a href="/cart"><Icon className='shopping__icon' icon={shoppingCartSign} /></a>
              <a href="/signin"><Icon className='signin__icon' icon={loginOutlined} /></a>
            </div>
        </div>
    )
}

export default Header
