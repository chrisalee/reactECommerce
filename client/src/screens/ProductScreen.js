import React, { useEffect } from "react";
import "./ProductScreen.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";
import { detailsProduct } from "../actions/productActions";

const ProductScreen = (props) => {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);

  return (
    <div>
      <Link to="/">
        <p>Back to results</p>
      </Link>
      {loading ? (<Loading />) : error ? (<MessageBox varient="danger">{error}</MessageBox>) : (
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
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  />
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
                    <button className="productScreen__button">
                      Add to Cart
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductScreen;
