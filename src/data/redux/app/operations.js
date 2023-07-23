import * as actions from './actions';
import {Alert} from 'react-native';
import {clearData} from 'api/UserPreference';
import {BASE_URL, makeRequest} from 'api/ApiInfo';

export const contactInfo = params => async dispatch => {
  try {
    const response = await makeRequest(
      BASE_URL + 'api/Mobile/contactInformation',
      params,
    );
    if (response) {
      dispatch(actions.contactInfo(response));
    }
  } catch (error) {
    dispatch(actions.error(error));
  }
};
export const resetCount = params => async dispatch => {
  try {
    const response = await makeRequest(
      BASE_URL + 'api/Mobile/resetNotificationCount',
      params,
      true,
      false,
    );
    if (response) {
      dispatch(actions.resetCount(response));
    }
  } catch (error) {
    dispatch(actions.error(error));
  }
};

export const getNotification = params => async dispatch => {
  try {
    const response = await makeRequest(
      BASE_URL + 'api/Mobile/notifications',
      params,
      true,
      false,
    );

    if (response) {
      dispatch(actions.getNotification(response));

      const {isAuthTokenExpired} = response;
      if (isAuthTokenExpired === true) {
        Alert.alert(
          'Gouri Brand',
          'Your Session Has Been Expired \n Login Again to Continue!',
          [
            {
              text: 'OK',
            },
          ],
          {
            cancelable: false,
          },
        );
        handleTokenExpire();
        return;
      }
    }
  } catch (e) {}
};
