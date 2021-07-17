import userReducer from './user-reducer';
import newsReducer from './news-reducer';
import eventsReducer from './events-reducer';
import modalsReducer from './modals-reducer';
import stockReducer from './stock-reducer';
import searchReducer from './search-reducer';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  user: userReducer,
  news: newsReducer,
  events: eventsReducer,
  modals: modalsReducer,
  stock: stockReducer,
  search: searchReducer,
});
