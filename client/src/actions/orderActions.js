import Axios from "axios";
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAYMENT_REQUEST,
  ORDER_PAYMENT_SUCCESS,
  ORDER_PAYMENT_FAIL,
  ORDER_HISTORY_LIST_REQUEST,
  ORDER_HISTORY_LIST_FAIL,
  ORDER_HISTORY_LIST_SUCCESS,
} from "../constants/orderConstants";
import { CART_EMPTY } from "../constants/cartConstants";

export const createOrder = (order) => async (dispatch, getState) => {
  dispatch({
    type: ORDER_CREATE_REQUEST,
    payload: order,
  });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post(`/api/orders`, order, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data.order,
    });
    dispatch({
      type: CART_EMPTY,
    });
    localStorage.removeItem("cartItems");
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailsOrder = (orderId) => async (dispatch, getState) => {
  dispatch({
    type: ORDER_DETAILS_REQUEST,
    payload: orderId,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const paymentOrder = (order, paymentResult) => async (dispatch, getState) => {
    dispatch({
      type: ORDER_PAYMENT_REQUEST,
      payload: { order, paymentResult },
    });
    const { userSignin: { userInfo } } = getState();
    try {
      const { data } = Axios.put(`/api/orders/${order._id}/payment`, paymentResult, {
        headers: { Authorixation: `Bearer ${userInfo.token}` },
      });
      dispatch({
        type: ORDER_PAYMENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: ORDER_PAYMENT_FAIL,
        payload: message,
      });
    }
  };

export const historyOrder = () => async (dispatch, getState) => {
  dispatch({
    type: ORDER_HISTORY_LIST_REQUEST,
  });
  const { userSignin: {userInfo}} = getState();
  try {
    const { data } = Axios.get("/api/orders/history", {
      headers: { Authorization: `Bearer ${userInfo.token}`},
    });
    dispatch({
      type: ORDER_HISTORY_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ORDER_HISTORY_LIST_FAIL,
      payload: message,
    });
  }
};
