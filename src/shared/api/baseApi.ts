import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = import.meta.env.VITE_KINOPOISK_API_URL;
const API_KEY = import.meta.env.VITE_KINOPOISK_API_KEY;

export const baseApi = createApi({
  reducerPath: 'kinopoiskApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: headers => {
      if (API_KEY) {
        headers.set('X-API-KEY', API_KEY);
        headers.set('Content-Type', 'application/json');
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    getFilms: builder.query<any, { type: string; page: number }>({
      query: ({ type, page }) =>
        `/v2.2/films/collections?type=${type}&page=${page}`,
    }),
  }),
});

export const { useGetFilmsQuery } = baseApi;
