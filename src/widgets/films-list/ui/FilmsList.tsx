import {
  selectCountryId,
  selectGenreId,
  selectOrder,
  selectPage,
  selectType,
  setPage,
} from '@/entitry/film/model/filmsSlice';
import { FilmCard } from '@/features/film-card';
import { useGetFilmsQuery } from '@/shared/api/baseApi';
import { FILMS_LIST } from '@/shared/consts/constants';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { ErrorFallback } from '@/shared/ui';
import { Col, Flex, Pagination, Row, Spin, type PaginationProps } from 'antd';
import React from 'react';
import { useLocation } from 'react-router-dom';

const GENRE_ID_CARTOONS = 18;

export const FilmsList = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const countryId = useAppSelector(selectCountryId);
  const genreId = useAppSelector(selectGenreId);
  const order = useAppSelector(selectOrder);
  const type = useAppSelector(selectType);
  const page = useAppSelector(selectPage);

  const matchedFilm = FILMS_LIST.find(item => item.url === location.pathname);
  const genreIdCartoons =
    matchedFilm?.url === '/cartoons' ? GENRE_ID_CARTOONS : genreId;

  const {
    data: films = [],
    isFetching,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetFilmsQuery({
    countryId,
    genreId: genreIdCartoons,
    order,
    type,
    page,
  });

  const handleChange: PaginationProps['onChange'] = page => {
    dispatch(setPage(page));
  };

  const pageSize = Math.ceil(films.total / films.totalPages);

  const pagination = (
    <Pagination
      total={films.total}
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
    content = <Spin />;
  } else if (isError) {
    content = <ErrorFallback error={error} />;
  } else if (isSuccess) {
    const renderedFilms = films.items?.map(film => (
      <Col key={film.kinopoiskId} xs={24} sm={12} md={8} lg={6}>
        <FilmCard item={film} />
      </Col>
    ));

    content = (
      <Flex vertical gap={16}>
        <Spin spinning={isFetching}>
          <Row gutter={[16, 16]}>{renderedFilms}</Row>
        </Spin>
        {pagination}
      </Flex>
    );
  }

  return <>{content}</>;
};
