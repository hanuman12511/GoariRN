import * as actions from './actions';
import {Alert} from 'react-native';
import {clearData} from 'api/UserPreference';
import {BASE_URL, makeRequest} from 'api/ApiInfo';

export const viewCoupons = params => async dispatch => {
  try {
    const response = await makeRequest(
      BASE_URL + 'api/mobile/couponsList',
      params,
    );

    if (response) {
      dispatch(actions.viewCoupons(response));
    }
  } catch (error) {
    dispatch(actions.error(error));
  }
};
export const walletBalance = params => async dispatch => {
  try {
    const response = await makeRequest(
      'https://thewisewords.in/api/Customer/walletBalance',
      params,
      true,
      false,
    );

    if (response) {
      dispatch(actions.walletBalance(response));
    }
  } catch (error) {
    dispatch(actions.error(error));
  }
};
export const walletIncome = params => async dispatch => {
  try {
    const response = await makeRequest(
      BASE_URL + 'api/Mobile/walletIncome',
      params,
      true,
      false,
    );

    if (response) {
      dispatch(actions.walletIncome(response));
    }
  } catch (error) {
    dispatch(actions.error(error));
  }
};
export const addMoney = params => async dispatch => {
  try {
    const response = await makeRequest(
      'https://thewisewords.in/api/Customer/addMoney',
      params,
      true,
      false,
    );

    if (response) {
      dispatch(actions.addMoney(response));
    }
  } catch (error) {
    dispatch(actions.error(error));
  }
};
export const paymentVerify = params => async dispatch => {
  try {
    const response = await makeRequest(
      BASE_URL + 'api/Mobile/onlinePaymentVerification',
      params,
      true,
      false,
    );

    if (response) {
      dispatch(actions.paymentVerify(response));
    }
  } catch (error) {
    dispatch(actions.error(error));
  }
};
