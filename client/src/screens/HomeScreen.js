import React, { useEffect } from 'react';
import './HomeScreen.css';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';
import { listProducts } from '../actions/productActions';

const HomeScreen = () => {

  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList; 

  useEffect(() => {
      dispatch(listProducts());
  }, [dispatch]);

  return (
      <div className='homeScreen'>
        {loading ? <Loading /> : error ? <MessageBox varient='danger'>{error}</MessageBox> :
          <div className="row center">
            {
              products.map((product) => (
                <Product 
                  key = {product._id}
                  product = {product}
                />
              ))
            }
          </div>
        }
        
      </div>
  )
}

export default HomeScreen
