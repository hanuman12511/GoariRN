import * as types from './types';
import {combineReducers} from 'redux';

const privacyPolicyReducer = (state = {}, action) => {
  switch (action.type) {
    case types.PRIVACY_POLICY:
      return action.payload;
    case types.ERROR:
      return action.payload;
    default:
      return state;
  }
};
const termsConditionReducer = (state = {}, action) => {
  switch (action.type) {
    case types.TERM_CONDITION:
      {
        console.log('+++++++++++++++reducers === ', action.payload);
      }
      return action.payload;
    case types.ERROR:
      return action.payload;
    default:
      return state;
  }
};
const cancelRefundReducer = (state = {}, action) => {
  switch (action.type) {
    case types.CANCELLATION_REFUND:
      return action.payload;
    case types.ERROR:
      return action.payload;
    default:
      return state;
  }
};

const reducer = combineReducers({
  privacyPolicy: privacyPolicyReducer,
  cancelRefund: cancelRefundReducer,
  termsCondition: termsConditionReducer,
});

export default reducer;
