import {
  selectCountryId,
  selectGenreId,
  selectOrder,
  selectPage,
  selectType,
  selectYear,
  setPage,
} from '@/entitry/film/model/filmsSlice';
import { FilmCard } from '@/features/film-card';
import { FilmFilterControls } from '@/features/film/FilmFilterControls';
import {
  useGetFilmGenresAndCountriesQuery,
  useGetFilmsQuery,
} from '@/shared/api/baseApi';
import { FILMS_LIST } from '@/shared/consts/constants';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { ErrorFallback } from '@/shared/ui';
import {
  Card,
  Col,
  Flex,
  Pagination,
  Row,
  Spin,
  type PaginationProps,
} from 'antd';
import React from 'react';
import { useLocation } from 'react-router-dom';

const GENRE_ID_CARTOONS = 18;

export const FilmsList = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const countryId = useAppSelector(selectCountryId);
  const genreId = useAppSelector(selectGenreId);
  const order = useAppSelector(selectOrder);
  const year = useAppSelector(selectYear);
  const type = useAppSelector(selectType);
  const page = useAppSelector(selectPage);

  const matchedFilm = FILMS_LIST.find(item => item.url === location.pathname);
  const genreIdCartoons =
    matchedFilm?.url === '/cartoons' ? GENRE_ID_CARTOONS : genreId;

  const {
    data: filmsResult = { total: 0, totalPages: 0, items: [] },
    isFetching,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetFilmsQuery({
    countryId,
    genreId: genreIdCartoons,
    order,
    year,
    type,
    page,
  });

  const { data: genresAndCountriesResult = { genres: [], countries: [] } } =
    useGetFilmGenresAndCountriesQuery();

  const handleChange: PaginationProps['onChange'] = page => {
    dispatch(setPage(page));
  };

  const pageSize = Math.ceil(filmsResult.total / filmsResult.totalPages);

  const pagination = (
    <Pagination
      total={filmsResult.total}
      defaultCurrent={page}
      current={page}
      pageSize={pageSize}
      onChange={handleChange}
      showSizeChanger={false}
    />
  );

  let content: React.ReactNode;
  // isFetching;
  if (isLoading) {
    content = (
      <Spin tip="Loading content..." size="large">
        <div
          style={{
            padding: 50,
            background: 'rgba(0, 0, 0, 0.05)',
            borderRadius: 4,
          }}
        />
      </Spin>
    );
  } else if (isError) {
    content = <ErrorFallback error={error} />;
  } else if (isSuccess) {
    const renderedFilms = filmsResult.items?.map(film => (
      <Col key={film.kinopoiskId} xs={24} sm={12} md={8} lg={6}>
        <FilmCard item={film} />
      </Col>
    ));

    content = (
      <Flex vertical gap={16}>
        <Spin spinning={isFetching} tip="Fetching content...">
          <Card>
            <FilmFilterControls
              countryList={genresAndCountriesResult.countries}
              genreList={genresAndCountriesResult.genres}
              genreId={genreId}
              countryId={countryId}
              year={year}
              order={order}
            />
          </Card>
        </Spin>

        <Spin spinning={isFetching} tip="Fetching content...">
          <Row gutter={[16, 16]}>{renderedFilms}</Row>
        </Spin>
        {pagination}
      </Flex>
    );
  }

  return <>{content}</>;
};
