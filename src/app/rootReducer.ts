import {
  collectionsAndTopsSlice,
  filmsSlice,
  genresAndCountriesSlice,
} from '@/entitry/film';
import { queryParamsSlice } from '@/features/search';
import { baseApi } from '@/shared/api';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
  [queryParamsSlice.name]: queryParamsSlice.reducer,
  [collectionsAndTopsSlice.name]: collectionsAndTopsSlice.reducer,
  [filmsSlice.name]: filmsSlice.reducer,
  [genresAndCountriesSlice.name]: genresAndCountriesSlice.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
});
