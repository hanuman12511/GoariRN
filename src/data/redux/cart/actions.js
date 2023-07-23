import * as types from './types';

export const viewCart = payload => ({
  type: types.VIEW_CART,
  payload,
});
export const addToCart = payload => ({
  type: types.ADD_TO_CART,
  payload,
});
export const cartUpdate = payload => ({
  type: types.CART_UPDATE,
  payload,
});
export const showSlots = payload => ({
  type: types.SLOTS,
  payload,
});
export const orderProduct = payload => ({
  type: types.ORDER_CART,
  payload,
});
export const orderDetail = payload => ({
  type: types.ORDER_DETAILS,
  payload,
});
