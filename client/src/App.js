import React from "react";
import data from "./data";

const App = () => {
  return (
    <div classNameName="app">
      <div className="grid-container">
        <header className="row">
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
              <a href="/cart">Cart</a>
              <a href="/signin">Sign In</a>
            </div>
          </header>

          <main>
            <div className="row center">
              {
                data.products.map((product) => (
                  <div key={product._id} className="card">
                    <a href={`/product/${product._id}`}>
                        <img
                          className="product__image"
                          src={product.image}
                          alt={product.name}
                        />
                      </a>
                      <div className="card__body">
                        <a href={`/product/${product._id}`}>
                          <h2>{product.name}</h2>
                        </a>
                        <div className="card__rating">

                            <span><i class="fa fa-star"></i></span>

                        </div>
                        <div className="card__price">
                          <p>${product.price}</p>
                        </div>
                      </div>
                    </div>
                ))
              }
            </div>
          </main>

          <footer className="row center">Copyright all rights reserved</footer>
        </div>
      </div>
  );
};

export default App;
