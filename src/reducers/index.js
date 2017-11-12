import { combineReducers } from 'redux';

import { routerReducer as router } from 'react-router-redux';
import searchGenre from './searchGenreReducer';
import musicGenre from './musicGenreReducer';
import player from './playerReducer';

export default combineReducers({
  musicGenre,
  searchGenre,
  player,
  router,
});
