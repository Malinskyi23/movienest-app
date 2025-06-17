import { filmsCollectionsFiltersSlice } from '@/pages/films-collections';
import { filmsFiltersSlice } from '@/pages/films-main';
import { baseApi } from '@/shared/api';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
  [filmsFiltersSlice.name]: filmsFiltersSlice.reducer,
  [filmsCollectionsFiltersSlice.name]: filmsCollectionsFiltersSlice.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
});
