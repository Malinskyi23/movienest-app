import type { RootState } from '@/app/store';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type FilmOrder = 'RATING' | 'NUM_VOTE' | 'YEAR';
export type FilmType = 'FILM' | 'TV_SHOW' | 'TV_SERIES' | 'MINI_SERIES' | 'ALL';

export interface FilmsState {
  countryId?: number;
  genreId?: number;
  order?: FilmOrder;
  type: FilmType;
  page: number;
}

const initialState: FilmsState = {
  countryId: 1,
  genreId: 1,
  order: 'RATING',
  type: 'ALL',
  page: 1,
};

export const filmsSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {
    setType: (state, action: PayloadAction<FilmType>) => {
      state.type = action.payload;
      state.page = 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
});

export const { setPage, setType } = filmsSlice.actions;

export const selectCountryId = (state: RootState) => state.films.countryId;
export const selectGenreId = (state: RootState) => state.films.genreId;
export const selectOrder = (state: RootState) => state.films.order;
export const selectType = (state: RootState) => state.films.type;
export const selectPage = (state: RootState) => state.films.page;
