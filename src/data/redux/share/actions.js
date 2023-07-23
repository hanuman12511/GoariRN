import * as types from './types';

export const shareToUser = payload => ({
  type: types.SHARE_USER,
  payload,
});
