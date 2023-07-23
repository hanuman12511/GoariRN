import * as actions from './actions';
import {Alert} from 'react-native';
import {clearData} from 'api/UserPreference';
import {BASE_URL, makeRequest} from 'api/ApiInfo';
export const viewCart = params => async dispatch => {
  try {
    const response = await makeRequest(
      BASE_URL + 'api/Mobile/viewCart',
      params,
      true,
      false,
    );

    if (response) {
      dispatch(actions.viewCart(response));
    }
  } catch (error) {
    dispatch(actions.error(error));
  }
};
export const addToCart = params => async dispatch => {
  try {
    const response = await makeRequest(
      BASE_URL + 'api/Mobile/addToCart',
      params,
      true,
      false,
    );

    if (response) {
      dispatch(actions.addToCart(response));
    }
  } catch (error) {
    dispatch(actions.error(error));
  }
};
export const cartUpdate = params => async dispatch => {
  console.log(params);
  dispatch(actions.cartUpdate(params));
};

export const showSlots = params => async dispatch => {
  try {
    const response = await makeRequest(
      BASE_URL + 'api/Mobile/slots',
      params,
      true,
      false,
    );

    if (response) {
      dispatch(actions.showSlots(response));
    }
  } catch (error) {
    dispatch(actions.error(error));
  }
};
export const orderProduct = params => async dispatch => {
  try {
    const response = await makeRequest(
      BASE_URL + 'api/Mobile/orderCart',
      params,
      true,
      false,
    );
    if (response) {
      dispatch(actions.orderProduct(response));
    }
  } catch (error) {
    dispatch(actions.error(error));
  }
};
export const orderDetail = params => async dispatch => {
  try {
    const response = await makeRequest(
      BASE_URL + 'api/Mobile/orderDetail',
      params,
      true,
      false,
    );

    if (response) {
      dispatch(actions.orderDetail(response));
    }
  } catch (error) {
    dispatch(actions.error(error));
  }
};
