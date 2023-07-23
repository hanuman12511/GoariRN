import * as types from './types';

export const registerUser = payload => ({
  type: types.REGISTER_USER,
  payload,
});
export const loginUser = payload => ({
  type: types.USER_LOGIN,
  payload,
});
export const otpVerify = payload => ({
  type: types.OTP_VERIFY,
  payload,
});
export const resendOtp = payload => ({
  type: types.RESEND_OTP,
  payload,
});
