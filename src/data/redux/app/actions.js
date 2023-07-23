import * as types from './types';

export const contactInfo = payload => ({
  type: types.CONTACT_INFO,
  payload,
});
export const getNotification = payload => ({
  type: types.GET_NOTIFICATION,
  payload,
});
export const resetCount = payload => ({
  type: types.RESET_NOTIFICATION_COUNT,
  payload,
});
