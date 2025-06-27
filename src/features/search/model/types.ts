import type { FilmOrder, FilmType } from '@/entitry/film/model/filmsSlice';

export interface QueryParamsState {
  countryId?: number;
  genreId?: number;
  order?: FilmOrder;
  year?: number;
  keyword?: string;
  type?: FilmType;
  page?: number;
}
