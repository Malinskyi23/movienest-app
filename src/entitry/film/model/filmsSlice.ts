import type { RootState } from '@/app/store';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type FilmOrder = 'RATING' | 'NUM_VOTE' | 'YEAR';
export type FilmType = 'FILM' | 'TV_SHOW' | 'TV_SERIES' | 'MINI_SERIES' | 'ALL';

export interface FilmsState {
  countryId?: number;
  genreId?: number;
  order?: FilmOrder;
  year?: number;
  // yearFrom?: number;
  // yearTo?: number;
  type: FilmType;
  page: number;
}

const initialState: FilmsState = {
  countryId: 1,
  genreId: 1,
  order: 'RATING',
  year: new Date().getFullYear(),
  type: 'ALL',
  page: 1,
};

export const filmsSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {
    setGenreId: (state, action: PayloadAction<number>) => {
      state.genreId = action.payload;
    },
    setCountyId: (state, action: PayloadAction<number>) => {
      state.countryId = action.payload;
    },
    setOrder: (state, action: PayloadAction<FilmOrder>) => {
      state.order = action.payload;
    },
    setYear: (state, action: PayloadAction<number>) => {
      state.year = action.payload;
    },
    setType: (state, action: PayloadAction<FilmType>) => {
      state.type = action.payload;
      state.page = 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    resetFilters: () => initialState,
  },
});

export const {
  setGenreId,
  setCountyId,
  setOrder,
  setYear,
  setPage,
  setType,
  resetFilters,
} = filmsSlice.actions;

export const selectCountryId = (state: RootState) => state.films.countryId;
export const selectGenreId = (state: RootState) => state.films.genreId;
export const selectOrder = (state: RootState) => state.films.order;
export const selectYear = (state: RootState) => state.films.year;
export const selectType = (state: RootState) => state.films.type;
export const selectPage = (state: RootState) => state.films.page;
