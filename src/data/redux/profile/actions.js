import * as types from './types';

export const viewProfile = payload => ({
  type: types.VIEW_PROFILE,
  payload,
});
export const editProfile = payload => ({
  type: types.EDIT_PROFILE,
  payload,
});
export const viewAddress = payload => ({
  type: types.USER_ADDRESS,
  payload,
});
export const addAddress = payload => ({
  type: types.ADD_ADDRESS,
  payload,
});
export const deleteAddress = payload => ({
  type: types.DELETE_ADDRESS,
  payload,
});
