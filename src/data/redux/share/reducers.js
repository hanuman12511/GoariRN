import * as types from './types';
import {combineReducers} from 'redux';

const shareToUserReducer = (state = {}, action) => {
  switch (action.type) {
    case types.SHARE_USER:
      return action.payload;
    case types.ERROR:
      return action.payload;
    default:
      return state;
  }
};

const reducer = combineReducers({
  shareToUser: shareToUserReducer,
});

export default reducer;
