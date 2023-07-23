export const isRegisterSuccess = state => {
  return state.auth.registerUser;
};
export const isLoginSuccess = state => {
  return state.auth.loginUser;
};
export const isOtpVerifySuccess = state => {
  return state.auth.otpVerify;
};
export const isOtpResendSuccess = state => {
  return state.auth.resendOtp;
};
