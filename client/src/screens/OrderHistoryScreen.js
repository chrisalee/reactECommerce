import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { historyOrder } from '../actions/orderActions';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';
import './OrderHistoryScreen.css';

const OrderHistoryScreen = (props) => {
    const orderHistory = useSelector(state => state.orderHistory);
    const { loading, error, orders } = orderHistory;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(historyOrder())
    }, [dispatch])

    return (
        <div>
            <h1>Order History</h1>
            {loading ?  <Loading /> : error ? <MessageBox varient='danger'>{error}</MessageBox> :
                (
                    <table className='orderHistory__table'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt}</td>
                                    <td>{order.totalPrice.toFixed(2)}</td>
                                    <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                                    <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : 'No'}</td>
                                    <td>
                                        <button type='button' className='small' onClick={() => {props.history.push(`/order/${order._id}`)}}>Details</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                )
            }
        </div>
    )
}

export default OrderHistoryScreen;
