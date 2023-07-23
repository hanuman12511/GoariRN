import * as actions from './actions';
import {Alert} from 'react-native';
import {clearData} from 'api/UserPreference';
import {BASE_URL, makeRequest} from 'api/ApiInfo';

export const viewProfile = params => async dispatch => {
  try {
    const response = await makeRequest(
      BASE_URL + 'api/Mobile/viewProfile',
      params,
      true,
      false,
    );
    if (response) {
      dispatch(actions.viewProfile(response));
    }
  } catch (error) {
    dispatch(actions.error(error));
  }
};
export const editProfile = params => async dispatch => {
  try {
    const response = await makeRequest(
      BASE_URL + 'api/Mobile/editProfile',
      params,
      true,
      false,
    );
    if (response) {
      dispatch(actions.editProfile(response));
    }
  } catch (error) {
    dispatch(actions.error(error));
  }
};
export const viewAddress = params => async dispatch => {
  try {
    const response = await makeRequest(
      BASE_URL + 'api/mobile/viewAddress',
      params,
      true,
      false,
    );
    if (response) {
      dispatch(actions.viewAddress(response));
    }
  } catch (error) {
    dispatch(actions.error(error));
  }
};
export const addAddress = params => async dispatch => {
  try {
    const response = await makeRequest(
      BASE_URL + 'api/mobile/userAddresses',
      params,
      true,
      false,
    );
    if (response) {
      dispatch(actions.addAddress(response));
    }
  } catch (error) {
    dispatch(actions.error(error));
  }
};
export const deleteAddress = params => async dispatch => {
  try {
    const response = await makeRequest(
      BASE_URL + 'api/mobile/deleteAddress',
      params,
      true,
      false,
    );
    if (response) {
      dispatch(actions.deleteAddress(response));
    }
  } catch (error) {
    dispatch(actions.error(error));
  }
};
