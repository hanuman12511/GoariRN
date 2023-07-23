import * as actions from './actions';
import {Alert} from 'react-native';
import {clearData} from 'api/UserPreference';
import {BASE_URL, makeRequest} from 'api/ApiInfo';

export const faqQuestion = params => async dispatch => {
  try {
    const response = await makeRequest(
      BASE_URL + 'api/mobile/faqQuestion',
      params,
    );
    if (response) {
      dispatch(actions.faqQuestion(response));
    }
  } catch (error) {
    dispatch(actions.error(error));
  }
};
export const faqCategories = params => async dispatch => {
  try {
    const response = await makeRequest(
      BASE_URL + 'api/mobile/faqCategories',
      params,
    );
    if (response) {
      dispatch(actions.faqCategories(response));
    }
  } catch (error) {
    dispatch(actions.error(error));
  }
};
