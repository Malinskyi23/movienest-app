import type { RootState } from '@/app/store';
import type { CountryItem, GenreItem } from '@/shared/api/baseApi';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface GenresAndCountriesState {
  genres: GenreItem[];
  countries: CountryItem[];
}

const initialState: GenresAndCountriesState = {
  genres: [],
  countries: [],
};

export const genresAndCountriesSlice = createSlice({
  name: 'genresAndCountries',
  initialState,
  reducers: {
    setGenres: (state, action: PayloadAction<any>) => {
      state.genres = action.payload;
    },
    setCountries: (state, action: PayloadAction<any>) => {
      state.countries = action.payload;
    },
  },
});

export const { setGenres, setCountries } = genresAndCountriesSlice.actions;

export const selectGenres = (state: RootState) =>
  state.genresAndCountries.genres;
export const selectCountries = (state: RootState) =>
  state.genresAndCountries.countries;
