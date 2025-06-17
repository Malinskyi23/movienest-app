import { selectPage, selectType, setPage } from '@/pages/films-collections';
import { useGetFilmCollectionsQuery } from '@/shared/api/baseApi';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { ErrorFallback, SkeletonGrid } from '@/shared/ui';
import { type PaginationProps } from 'antd';
import React from 'react';

import { FilmsCollectionsGrid } from './FilmsCollectionsGrid';
import { FilmsCollectionsPagination } from './FilmsCollectionsPagination';

export const FilmsCollectionsList = () => {
  const dispatch = useAppDispatch();
  const type = useAppSelector(selectType);
  const page = useAppSelector(selectPage);

  const handleChange: PaginationProps['onChange'] = page => {
    dispatch(setPage(page));
  };

  const {
    data = [],
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetFilmCollectionsQuery({
    type,
    page,
  });

  let content: React.ReactNode;
  if (isFetching) {
    content = <SkeletonGrid />;
  } else if (isSuccess) {
    content = <FilmsCollectionsGrid items={data.items} />;
  } else if (isError) {
    content = <ErrorFallback error={error} />;
  }

  const pagination: React.ReactNode = (
    <FilmsCollectionsPagination
      total={data.total}
      current={page}
      pageSize={data.items?.length || 0}
      onChange={handleChange}
    />
  );

  return (
    <>
      {content}
      {pagination}
    </>
  );
};
