import * as types from './types';
import {combineReducers} from 'redux';

const registerUserReducer = (state = {}, action) => {
  switch (action.type) {
    case types.REGISTER_USER:
      return action.payload;

    case types.ERROR:
      return action.payload;
    default:
      return state;
  }
};
const loginUserReducer = (state = {}, action) => {
  switch (action.type) {
    case types.USER_LOGIN:
      return action.payload;

    case types.ERROR:
      return action.payload;
    default:
      return state;
  }
};
const otpVerifyReducer = (state = {}, action) => {
  switch (action.type) {
    case types.OTP_VERIFY:
      return action.payload;

    case types.ERROR:
      return action.payload;
    default:
      return state;
  }
};
const resendOtpReducer = (state = {}, action) => {
  switch (action.type) {
    case types.RESEND_OTP:
      return action.payload;

    case types.ERROR:
      return action.payload;
    default:
      return state;
  }
};

const reducer = combineReducers({
  registerUser: registerUserReducer,
  loginUser: loginUserReducer,
  otpVerify: otpVerifyReducer,
  resendOtp: resendOtpReducer,
});

export default reducer;
