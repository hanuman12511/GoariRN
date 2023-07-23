import * as types from './types';
import {combineReducers} from 'redux';

const faqQuestionReducer = (state = {}, action) => {
  switch (action.type) {
    case types.FAQ_QUES:
      return action.payload;
    case types.ERROR:
      return action.payload;
    default:
      return state;
  }
};
const faqCategoriesReducer = (state = {}, action) => {
  switch (action.type) {
    case types.FAQ_CATE:
      return action.payload;
    case types.ERROR:
      return action.payload;
    default:
      return state;
  }
};

const reducer = combineReducers({
  faqQuestion: faqQuestionReducer,
  faqCategories: faqCategoriesReducer,
});

export default reducer;
