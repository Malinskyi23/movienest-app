import type { RootState } from '@/app/store';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type FilmType = 'FILM' | 'TV_SHOW' | 'TV_SERIES' | 'MINI_SERIES' | 'ALL';
export type FilmOrder = 'RATING' | 'NUM_VOTE' | 'YEAR';

export interface FilmsFiltersState {
  countries: number[];
  genres: number[];
  order: FilmOrder;
  type: FilmType;
  yearFrom: number;
  yearTo: number;
  page: number;
}

const initialState: FilmsFiltersState = {
  countries: [],
  genres: [],
  order: 'NUM_VOTE',
  type: 'ALL',
  yearFrom: 1000,
  yearTo: 3000,
  page: 1,
};

export const filmsFiltersSlice = createSlice({
  name: 'filmsFilters',
  initialState,
  reducers: {
    setCountries: (state, action: PayloadAction<number[]>) => {
      state.countries = action.payload;
      state.page = 1;
    },
    setGenres: (state, action: PayloadAction<number[]>) => {
      state.genres = action.payload;
      state.page = 1;
    },
    setOrder: (state, action: PayloadAction<FilmOrder>) => {
      state.order = action.payload;
      state.page = 1;
    },
    setType: (state, action: PayloadAction<FilmType>) => {
      state.type = action.payload;
      state.page = 1;
    },
    setYearFrom: (state, action: PayloadAction<number>) => {
      state.yearFrom = action.payload;
      state.page = 1;
    },
    setYearTo: (state, action: PayloadAction<number>) => {
      state.yearTo = action.payload;
      state.page = 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    resetFilters: () => initialState,
  },
});

export const selectFilmsFilters = (state: RootState) => state.filmsFilters;
