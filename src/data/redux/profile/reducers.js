import * as types from './types';
import {combineReducers} from 'redux';

const viewProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case types.VIEW_PROFILE:
      return action.payload;
    case types.ERROR:
      return action.payload;
    default:
      return state;
  }
};
const editProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case types.EDIT_PROFILE:
      return action.payload;
    case types.ERROR:
      return action.payload;
    default:
      return state;
  }
};
const viewAddressReducer = (state = {}, action) => {
  switch (action.type) {
    case types.USER_ADDRESS:
      return action.payload;
    case types.ERROR:
      return action.payload;
    default:
      return state;
  }
};
const addAddressReducer = (state = {}, action) => {
  switch (action.type) {
    case types.ADD_ADDRESS:
      return action.payload;
    case types.ERROR:
      return action.payload;
    default:
      return state;
  }
};
const deleteAddressReducer = (state = {}, action) => {
  switch (action.type) {
    case types.DELETE_ADDRESS:
      return action.payload;
    case types.ERROR:
      return action.payload;
    default:
      return state;
  }
};

const reducer = combineReducers({
  editProfile: editProfileReducer,
  viewProfile: viewProfileReducer,
  viewAddress: viewAddressReducer,
  addAddress: addAddressReducer,
  deleteAddress: deleteAddressReducer,
});

export default reducer;
