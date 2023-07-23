export const isCouponList = state => {
  return state.wallet.viewCoupons;
};
export const isShowWalletBalance = state => {
  return state.wallet.walletBalance;
};
export const isWalletIncome = state => {
  return state.wallet.walletIncome;
};
export const isMoneyAdded = state => {
  return state.wallet.addMoney;
};
export const isPaymentVerifySuccess = state => {
  return state.wallet.paymentVerify;
};
