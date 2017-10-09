import { combineReducers } from 'redux';

import { routerReducer as router } from 'react-router-redux';
import searchGenre from './searchGenreReducer';

export default combineReducers({
  searchGenre,
  router,
});
