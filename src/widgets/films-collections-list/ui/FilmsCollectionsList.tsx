import {
  selectPage,
  selectType,
  setPage,
} from '@/entitry/film/model/collectionsAndTopsSlice';
import { FilmCard } from '@/features/film-card';
import { useGetFilmCollectionsQuery } from '@/shared/api/baseApi';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { ErrorFallback } from '@/shared/ui';
import { Col, Flex, Pagination, Row, Spin, type PaginationProps } from 'antd';
import React from 'react';

export const FilmsCollectionsList = () => {
  const dispatch = useAppDispatch();
  const type = useAppSelector(selectType);
  const page = useAppSelector(selectPage);

  const {
    data: collections = [],
    isFetching,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetFilmCollectionsQuery({
    type,
    page,
  });

  const handleChange: PaginationProps['onChange'] = page => {
    dispatch(setPage(page));
  };

  const pageSize = Math.ceil(collections.total / collections.totalPages);

  const pagination = (
    <Pagination
      total={collections.total}
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
    const renderedCollections = collections.items?.map(film => (
      <Col key={film.kinopoiskId} xs={24} sm={12} md={8} lg={6}>
        <FilmCard item={film} />
      </Col>
    ));

    content = (
      <Flex vertical gap={16}>
        <Spin spinning={isFetching} tip="Fetching content...">
          <Row gutter={[16, 16]}>{renderedCollections}</Row>
        </Spin>
        {pagination}
      </Flex>
    );
  }

  return <>{content}</>;
};
