import userReducer from './user-reducer';
import newsReducer from './news-reducer';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  user: userReducer,
  news: newsReducer,
});
