import {
  collectionsAndTopsSlice,
  filmsSlice,
  genresAndCountriesSlice,
} from '@/entitry/film';
import { baseApi } from '@/shared/api';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
  [collectionsAndTopsSlice.name]: collectionsAndTopsSlice.reducer,
  [filmsSlice.name]: filmsSlice.reducer,
  [genresAndCountriesSlice.name]: genresAndCountriesSlice.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
});
