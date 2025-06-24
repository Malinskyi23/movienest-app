import type { CollectionAndTopType } from '@/entitry/film/model/collectionsAndTopsSlice';
import type { FilmType } from '@/entitry/film/model/filmsSlice';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { EXCLUDE_GENRES } from '../consts/constants';

const API_URL = import.meta.env.VITE_KINOPOISK_API_URL;
const API_KEY = import.meta.env.VITE_KINOPOISK_API_KEY;

export interface FilmItem {
  kinopoiskId: number;
  imdbId?: string;
  nameRu: string;
  nameEn?: string;
  nameOriginal?: string;
  countries: { country: string }[];
  genres: { genre: string }[];
  ratingKinopoisk?: number;
  ratingImdb?: number;
  year: number | string;
  type: FilmType | string;
  posterUrl: string;
  posterUrlPreview: string;
}

export interface FilmsResponse {
  total: number;
  totalPages: number;
  items: FilmItem[];
}

export type GenreItem = { genre: string; id: number };
export type CountryItem = { country: string; id: number };

export interface GenresAndCountriesResponse {
  genres: GenreItem[];
  countries: CountryItem[];
}

export interface GetFilmCollectionsArgs {
  type?: CollectionAndTopType;
  page: number;
}

export interface GetFilmsArgs {
  countryId?: number;
  genreId?: number;
  order?: string;
  type?: string;
  year?: number;
  // yearFrom?: number;
  // yearTo?: number;
  page: number;
}

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
    // builder.query<ReturnedData, QueryArgs>
    // ReturnedData - the response data returned from the server. (requset result)
    // QueryArgs - the arguments passed to the hook and used to build the request
    getFilmCollections: builder.query<FilmsResponse, GetFilmCollectionsArgs>({
      query: ({ type, page }) =>
        `/v2.2/films/collections?type=${type}&page=${page}`,
    }),
    getFilms: builder.query<FilmsResponse, GetFilmsArgs>({
      query: ({ countryId, genreId, order, type, year, page }) => {
        const params = new URLSearchParams();

        if (countryId !== undefined)
          params.append('countries', String(countryId));
        if (genreId !== undefined) params.append('genres', String(genreId));
        if (order) params.append('order', order);
        if (type) params.append('type', type);
        if (year !== undefined) params.append('yearFrom', String(year));
        if (year !== undefined) params.append('yearTo', String(year));
        params.append('page', String(page));

        return `/v2.2/films?${params.toString()}`;
      },
      // `/v2.2/films?countries=${countryId}&genres=${genreId}&order=${order}&type=${type}&yearFrom=${yearFrom}&yearTo=${yearTo}&page=${page}`,
    }),
    getFilmGenresAndCountries: builder.query<GenresAndCountriesResponse, void>({
      query: () => '/v2.2/films/filters',
      transformResponse: (response: GenresAndCountriesResponse) => ({
        ...response,
        genres: response.genres.filter(
          ({ genre }: GenreItem) => !EXCLUDE_GENRES.includes(genre),
        ),
      }),
    }),
  }),
});

export const {
  useGetFilmCollectionsQuery,
  useGetFilmsQuery,
  useGetFilmGenresAndCountriesQuery,
} = baseApi;
