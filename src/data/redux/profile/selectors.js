export const isProfile = state => {
  return state.profile.viewProfile;
};
export const isProfileEditSuccess = state => {
  return state.profile.editProfile;
};
export const isAddressView = state => {
  return state.profile.viewAddress;
};
export const isAddressAdded = state => {
  return state.profile.addAddress;
};
export const isAddressDeleted = state => {
  return state.profile.deleteAddress;
};
