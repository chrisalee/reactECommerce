import React from "react";
import './Product.css';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = (props) => {

  const { product } = props;

  return (
    <div>
      <div key={product._id} className="product__card">
        <Link to={`/product/${product._id}`}>
          <img
            className="product__image"
            src={product.image}
            alt={product.name}
          />
        </Link>

        <div className="product__cardBody">
          <Link to={`/product/${product._id}`} className='product__cardName'>
            <h2>{product.name}</h2>
          </Link>
          
          <Rating 
            rating = {product.rating}
            numReviews = {product.numReviews}
          />
          <div className="product__cardPrice">
            <p>${product.price}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
