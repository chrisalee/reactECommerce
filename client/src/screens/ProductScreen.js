import React from "react";
import "./ProductScreen.css";
import Rating from "../components/Rating";
import data from "../data";

const ProductScreen = (props) => {
  const product = data.products.find(
    (index) => index._id === props.match.params.id
  );

  if (!product) {
    return (
      <div>
        <p>Product not found</p>
      </div>
    );
  }

  return (
    <div className="productScreen">
      <div className="row top">
        <div className="col-2">
          <img
            className="productScreen__image"
            src={product.image}
            alt={product.name}
          />
        </div>
        <div className="col-1">
          <ul>
            <li>
              <h1>{product.name}</h1>
            </li>
            <li>
              <Rating rating={product.rating} numReviews={product.numReviews} />
            </li>
            <li>
              <p>Price: ${product.price}</p>
            </li>
            <li>
              <p>Description: {product.description}</p>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card-body card">
            <ul>
              <li>
                <div className="row">
                  <div>Price</div>
                  <div className="price">${product.price}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Status:</div>
                  <div>
                    {product.countInStock > 0 ? (
                      <span className="productScreen__countSuccess">
                        In Stock
                      </span>
                    ) : (
                      <span className="productScreen__countUnavailable">
                        Unavailable at this time
                      </span>
                    )}
                  </div>
                </div>
              </li>
              <li>
                <button className="productScreen__button">Add to Cart</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;
