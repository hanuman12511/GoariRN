export const isContactInfo = state => {
  return state.app.contactInfo;
};
export const isNotificationGet = state => {
  return state.app.getNotification;
};
export const isNotificationReset = state => {
  return state.app.resetCount;
};
