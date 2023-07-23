import * as types from './types';
import {combineReducers} from 'redux';

const viewCouponsReducer = (state = {}, action) => {
  switch (action.type) {
    case types.COUPONS_LIST:
      return action.payload;
    case types.ERROR:
      return action.payload;
    default:
      return state;
  }
};
const walletBalanceReducer = (state = {}, action) => {
  switch (action.type) {
    case types.WALLET_BALANCE:
      return action.payload;
    case types.ERROR:
      return action.payload;
    default:
      return state;
  }
};
const walletIncomeReducer = (state = {}, action) => {
  switch (action.type) {
    case types.WALLET_INCOME:
      return action.payload;
    case types.ERROR:
      return action.payload;
    default:
      return state;
  }
};
const addMoneyReducer = (state = {}, action) => {
  switch (action.type) {
    case types.ADD_MONEY:
      return action.payload;
    case types.ERROR:
      return action.payload;
    default:
      return state;
  }
};
const paymentVerifyReducer = (state = {}, action) => {
  switch (action.type) {
    case types.PAYMENT_VERIFY:
      return action.payload;
    case types.ERROR:
      return action.payload;
    default:
      return state;
  }
};

const reducer = combineReducers({
  paymentVerify: paymentVerifyReducer,
  addMoney: addMoneyReducer,
  walletIncome: walletIncomeReducer,
  walletBalance: walletBalanceReducer,
  viewCoupons: viewCouponsReducer,
});

export default reducer;
