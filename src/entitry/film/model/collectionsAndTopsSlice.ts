import type { RootState } from '@/app/store';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type CollectionAndTopType =
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

export interface CollectionsAndTopsState {
  type: CollectionAndTopType;
  page: number;
}

const initialState: CollectionsAndTopsState = {
  type: 'TOP_POPULAR_MOVIES',
  page: 1,
};

export const collectionsAndTopsSlice = createSlice({
  name: 'collectionsAndTops',
  initialState,
  reducers: {
    setType: (state, action: PayloadAction<CollectionAndTopType>) => {
      state.type = action.payload;
      state.page = 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
});

export const { setPage, setType } = collectionsAndTopsSlice.actions;

export const selectType = (state: RootState) => state.collectionsAndTops.type;
export const selectPage = (state: RootState) => state.collectionsAndTops.page;
