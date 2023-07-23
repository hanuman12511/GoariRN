import * as types from './types';

export const privacyPolicy = payload => ({
  type: types.PRIVACY_POLICY,
  payload,
});
export const termsCondition = payload => ({
  type: types.TERM_CONDITION,
  payload,
});
export const cancelRefund = payload => ({
  type: types.CANCELLATION_REFUND,
  payload,
});
