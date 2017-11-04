import { combineReducers } from 'redux';

import { routerReducer as router } from 'react-router-redux';
import searchGenre from './searchGenreReducer';
import musicGenre from './musicGenreReducer';

export default combineReducers({
  musicGenre,
  searchGenre,
  router,
});
