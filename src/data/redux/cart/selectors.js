export const isCartAvailable = state => {
  return state.cart.viewCart;
};
export const isItemAddSuccess = state => {
  return state.cart.addToCart;
};
export const isCartCount = state => {
  return state.cart.cartUpdate;
};
export const isShowSlots = state => {
  return state.cart.showSlots;
};
export const isOrderProduct = state => {
  return state.cart.orderProduct;
};
export const isOrderDetail = state => {
  return state.cart.orderDetail;
};
