import { filmCollectionsSlice, filmsSlice } from '@/entitry/film';
import { baseApi } from '@/shared/api';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
  [filmsSlice.name]: filmsSlice.reducer,
  [filmCollectionsSlice.name]: filmCollectionsSlice.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
});
