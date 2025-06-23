import type { RootState } from '@/app/store';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type CollectionType =
  | 'TOP_POPULAR_ALL'
  | 'TOP_POPULAR_MOVIES'
  | 'TOP_250_TV_SHOWS'
  | 'TOP_250_MOVIES'
  | 'VAMPIRE_THEME'
  | 'COMICS_THEME'
  | 'CLOSES_RELEASES'
  | 'FAMILY'
  | 'OSKAR_WINNERS_2021'
  | 'LOVE_THEME'
  | 'ZOMBIE_THEME'
  | 'CATASTROPHE_THEME'
  | 'KIDS_ANIMATION_THEME'
  | 'POPULAR_SERIES';

export interface FilmCollectionsState {
  type: CollectionType;
  page: number;
}

const initialState: FilmCollectionsState = {
  type: 'TOP_POPULAR_MOVIES',
  page: 1,
};

export const filmCollectionsSlice = createSlice({
  name: 'filmCollections',
  initialState,
  reducers: {
    setType: (state, action: PayloadAction<CollectionType>) => {
      state.type = action.payload;
      state.page = 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
});

export const { setPage, setType } = filmCollectionsSlice.actions;

export const selectType = (state: RootState) => state.filmCollections.type;
export const selectPage = (state: RootState) => state.filmCollections.page;
