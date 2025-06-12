import { filmsCollectionsSlice } from '@/pages/films-collections';
import { baseApi } from '@/shared/api';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
  // [emailTestsSlice.name]: emailTestsSlice.reducer,
  [filmsCollectionsSlice.name]: filmsCollectionsSlice.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
});
