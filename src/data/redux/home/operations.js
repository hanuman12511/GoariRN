import * as actions from './actions';
import {Alert} from 'react-native';
import {clearData} from 'api/UserPreference';
import {BASE_URL, makeRequest} from 'api/ApiInfo';

export const getHome = params => async dispatch => {
  try {
    const response = await makeRequest(BASE_URL + 'api/mobile/home', params);
    if (response) {
      dispatch(actions.getHome(response));
    }
  } catch (error) {
    dispatch(actions.error(error));
  }
};
