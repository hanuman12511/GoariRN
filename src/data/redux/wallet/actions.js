import * as types from './types';

export const viewCoupons = payload => ({
  type: types.COUPONS_LIST,
  payload,
});
export const walletBalance = payload => ({
  type: types.WALLET_BALANCE,
  payload,
});
export const walletIncome = payload => ({
  type: types.WALLET_INCOME,
  payload,
});
export const addMoney = payload => ({
  type: types.ADD_MONEY,
  payload,
});
export const paymentVerify = payload => ({
  type: types.PAYMENT_VERIFY,
  payload,
});
