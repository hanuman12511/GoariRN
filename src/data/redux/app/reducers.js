import * as types from './types';
import {combineReducers} from 'redux';

const contactInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case types.CONTACT_INFO:
      return action.payload;
    case types.ERROR:
      return action.payload;
    default:
      return state;
  }
};
const getNotificationReducer = (state = {}, action) => {
  switch (action.type) {
    case types.GET_NOTIFICATION:
      return action.payload;
    case types.ERROR:
      return action.payload;
    default:
      return state;
  }
};
const resetCountReducer = (state = {}, action) => {
  switch (action.type) {
    case types.RESET_NOTIFICATION_COUNT:
      return action.payload;
    case types.ERROR:
      return action.payload;
    default:
      return state;
  }
};

const reducer = combineReducers({
  resetCount: resetCountReducer,
  getNotification: getNotificationReducer,
  contactInfo: contactInfoReducer,
});

export default reducer;
