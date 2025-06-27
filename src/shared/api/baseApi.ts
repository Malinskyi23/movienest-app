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

export type FilmDetails = {
  kinopoiskId: number;
  kinopoiskHDId?: string;
  imdbId?: string;
  nameRu: string;
  nameEn?: string;
  nameOriginal?: string;
  posterUrl: string;
  posterUrlPreview: string;
  coverUrl?: string;
  logoUrl?: string;
  reviewsCount?: number;
  ratingGoodReview?: number;
  ratingGoodReviewVoteCount?: number;
  ratingKinopoisk?: number;
  ratingKinopoiskVoteCount?: number;
  ratingImdb?: number;
  ratingImdbVoteCount?: number;
  ratingFilmCritics?: number;
  ratingFilmCriticsVoteCount?: number;
  ratingAwait?: number;
  ratingAwaitCount?: number;
  ratingRfCritics?: number;
  ratingRfCriticsVoteCount?: number;
  webUrl?: string;
  year?: number;
  filmLength?: number;
  slogan?: string;
  description?: string;
  shortDescription?: string;
  editorAnnotation?: string;
  isTicketsAvailable?: boolean;
  productionStatus?: string;
  type?: FilmType | string;
  ratingMpaa?: string;
  ratingAgeLimits?: string;
  hasImax?: boolean;
  has3D?: boolean;
  lastSync?: string;
  countries: { country: string }[];
  genres: { genre: string }[];
  startYear?: number;
  endYear?: number;
  serial?: boolean;
  shortFilm?: boolean;
  completed?: boolean;
};

export type FilmDetailsResponse = FilmDetails;

export type SequelOrPrequel = {
  filmId: number;
  kinopoiskId?: number;
  nameRu: string;
  nameEn?: string;
  nameOriginal?: string;
  posterUrl: string;
  posterUrlPreview: string;
  relationType: 'SEQUEL' | 'PREQUEL';
};

export type SequelsAndPrequelsResponse = SequelOrPrequel[];

export type StaffMember = {
  staffId: number;
  nameRu: string;
  nameEn?: string;
  description?: string;
  posterUrl: string;
  professionText: string;
  professionKey: 'DIRECTOR' | 'ACTOR' | 'WRITER' | string;
};

export type StaffResponse = StaffMember[];

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
  page?: number;
  keyword?: string;
}

export interface GetStaffArgs {
  filmId: number;
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
    getFilmById: builder.query<FilmDetailsResponse, number>({
      query: id => `/v2.2/films/${id}`,
    }),
    getSequelsAndPrequels: builder.query<SequelsAndPrequelsResponse, number>({
      query: id => `/v2.1/films/${id}/sequels_and_prequels`,
      transformResponse: (data: SequelsAndPrequelsResponse) =>
        data.map(datum => ({ ...datum, kinopoiskId: datum.filmId })),
    }),
    getFilmCollections: builder.query<FilmsResponse, GetFilmCollectionsArgs>({
      query: ({ type, page }) =>
        `/v2.2/films/collections?type=${type}&page=${page}`,
    }),
    getFilms: builder.query<FilmsResponse, GetFilmsArgs>({
      query: ({ countryId, genreId, order, type, year, page, keyword }) => {
        const params = new URLSearchParams();

        if (countryId !== undefined)
          params.append('countries', String(countryId));
        if (genreId !== undefined) params.append('genres', String(genreId));
        if (order) params.append('order', order);
        if (type) params.append('type', type);
        if (year !== undefined) params.append('yearFrom', String(year));
        if (year !== undefined) params.append('yearTo', String(year));
        if (keyword) params.append('keyword', keyword);
        if (page) params.append('page', String(page));

        return `/v2.2/films?${params.toString()}`;
      },
      // `/v2.2/films?countries=${countryId}&genres=${genreId}&order=${order}&type=${type}&yearFrom=${yearFrom}&yearTo=${yearTo}&page=${page}`,
    }),
    getFilmGenresAndCountries: builder.query<GenresAndCountriesResponse, void>({
      query: () => '/v2.2/films/filters',
      transformResponse: (data: GenresAndCountriesResponse) => ({
        ...data,
        genres: data.genres.filter(
          ({ genre }: GenreItem) => !EXCLUDE_GENRES.includes(genre),
        ),
      }),
    }),
    getStaff: builder.query<StaffResponse, GetStaffArgs>({
      query: ({ filmId }) => `/v1/staff?filmId=${filmId}`,
    }),
  }),
});

export const {
  useGetFilmByIdQuery,
  useGetFilmsQuery,
  useGetFilmCollectionsQuery,
  useGetFilmGenresAndCountriesQuery,
  useGetSequelsAndPrequelsQuery,
  useGetStaffQuery,
} = baseApi;
