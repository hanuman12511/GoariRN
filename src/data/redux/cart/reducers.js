import * as types from './types';
import {combineReducers} from 'redux';

const viewCartReducer = (state = {}, action) => {
  switch (action.type) {
    case types.VIEW_CART:
      return action.payload;
    case types.ERROR:
      return action.payload;
    default:
      return state;
  }
};
const addToCartReducer = (state = {}, action) => {
  switch (action.type) {
    case types.ADD_TO_CART:
      return action.payload;
    case types.ERROR:
      return action.payload;
    default:
      return state;
  }
};
const cartUpdateReducer = (state = 0, action) => {
  switch (action.type) {
    case types.CART_UPDATE:
      return action.payload;
    case types.ERROR:
      return action.payload;
    default:
      return state;
  }
};
const showSlotsReducer = (state = {}, action) => {
  switch (action.type) {
    case types.SLOTS:
      return action.payload;
    case types.ERROR:
      return action.payload;
    default:
      return state;
  }
};
const orderProductReducer = (state = {}, action) => {
  switch (action.type) {
    case types.ORDER_CART:
      return action.payload;
    case types.ERROR:
      return action.payload;
    default:
      return state;
  }
};
const orderDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case types.ORDER_DETAILS:
      return action.payload;
    case types.ERROR:
      return action.payload;
    default:
      return state;
  }
};

const reducer = combineReducers({
  viewCart: viewCartReducer,
  addToCart: addToCartReducer,
  cartUpdate: cartUpdateReducer,
  showSlots: showSlotsReducer,
  orderProduct: orderProductReducer,
  orderDetail: orderDetailReducer,
});

export default reducer;
