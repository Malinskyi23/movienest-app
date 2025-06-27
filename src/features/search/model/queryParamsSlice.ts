import type { RootState } from '@/app/store';
import { createSlice } from '@reduxjs/toolkit';

import type { QueryParamsState } from './types';

// параметры строки запроса / query string parameters

const initialState: QueryParamsState = {};

export const queryParamsSlice = createSlice({
  name: 'queryParams',
  initialState,
  reducers: {
    setQueryParams: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const { setQueryParams } = queryParamsSlice.actions;

export default queryParamsSlice.reducer;

export const selectQueryParams = (state: RootState) => state.queryParams;

// export const selectCountryId = (state: RootState) =>
//   state.queryParams.countryId;
// export const selectGenreId = (state: RootState) => state.queryParams.genreId;
// export const selectOrder = (state: RootState) => state.queryParams.order;
// export const selectYear = (state: RootState) => state.queryParams.year;
// export const selectType = (state: RootState) => state.queryParams.type;
// export const selectPage = (state: RootState) => state.queryParams.page;
// export const selectKeyword = (state: RootState) => state.queryParams.keyword;
