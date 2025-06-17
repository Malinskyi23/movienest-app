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
    getFilmCollections: builder.query<any, { type?: string; page: number }>({
      query: ({ type, page }) =>
        `/v2.2/films/collections?type=${type}&page=${page}`,
    }),
    getFilms: builder.query<
      any,
      {
        countryId?: number;
        genreId?: number;
        order?: string;
        type?: string;
        yearFrom?: number;
        yearTo?: number;
        page: number;
      }
    >({
      query: ({
        // countries
        countryId,
        // genres,
        genreId,
        order = 'NUB_VOTE',
        type = 'FILM',
        yearFrom,
        yearTo,
        page,
      }) => {
        const params = new URLSearchParams();

        if (countryId !== undefined)
          params.append('countries', String(countryId));
        if (genreId !== undefined) params.append('genres', String(genreId));
        if (order) params.append('order', order);
        if (type) params.append('type', type);
        if (yearFrom !== undefined) params.append('yearFrom', String(yearFrom));
        if (yearTo !== undefined) params.append('yearTo', String(yearTo));
        params.append('page', String(page));

        return `/v2.2/films?${params.toString()}`;
      },
      // `/v2.2/films?countries=${countryId}&genres=${genreId}&order=${order}&type=${type}&yearFrom=${yearFrom}&yearTo=${yearTo}&page=${page}`,
    }),
  }),
});

export const { useGetFilmCollectionsQuery, useGetFilmsQuery } = baseApi;
