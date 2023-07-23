import * as actions from './actions';
import {Alert} from 'react-native';
import {clearData} from 'api/UserPreference';
import {BASE_URL, makeRequest} from 'api/ApiInfo';
import {nsNavigate} from 'routes/NavigationService';

export const registerUser = params => async dispatch => {
  try {
    const response = await makeRequest(
      BASE_URL + 'api/mobile/registration',
      params,
    );
    if (response) {
      dispatch(actions.registerUser(response));
    }
  } catch (error) {
    dispatch(actions.error(error));
  }
};
export const loginUser = params => async dispatch => {
  try {
    const response = await makeRequest(BASE_URL + 'api/mobile/login', params);
    if (response) {
      dispatch(actions.loginUser(response));
    }
  } catch (error) {
    dispatch(actions.error(error));
  }
};
export const otpVerify = params => async dispatch => {
  try {
    const response = await makeRequest(
      BASE_URL + 'api/mobile/loginOtpVerify',
      params,
    );
    if (response) {
      dispatch(actions.otpVerify(response));
    }
  } catch (error) {
    dispatch(actions.error(error));
  }
};
export const resendOtp = params => async dispatch => {
  try {
    const response = await makeRequest(
      BASE_URL + 'api/mobile/resendOtp',
      params,
    );
    if (response) {
      dispatch(actions.resendOtp(response));
    }
  } catch (error) {
    dispatch(actions.error(error));
  }
};
