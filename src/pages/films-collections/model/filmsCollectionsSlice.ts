import type { RootState } from '@/app/store';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface FilmsCollectionsState {
  type: string;
  page: number;
}

const initialState: FilmsCollectionsState = {
  type: 'TOP_POPULAR_MOVIES',
  page: 1,
};

export const filmsCollectionsSlice = createSlice({
  name: 'filmsCollections',
  initialState,
  reducers: {
    setType: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
      state.page = 1; // reset page when changing type
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
});

export const { setPage, setType } = filmsCollectionsSlice.actions;

export const selectType = (state: RootState) => state.filmsCollections.type;
export const selectPage = (state: RootState) => state.filmsCollections.page;
