import * as types from './types';

export const faqQuestion = payload => ({
  type: types.FAQ_QUES,
  payload,
});
export const faqCategories = payload => ({
  type: types.FAQ_CATE,
  payload,
});
