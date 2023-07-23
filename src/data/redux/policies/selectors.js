export const isPrivacySuccess = state => {
  return state.policies.privacyPolicy;
};
export const isTermsSuccess = state => {
  return state.policies.termsCondition;
};
export const isCancelSuccess = state => {
  return state.policies.cancelRefund;
};
