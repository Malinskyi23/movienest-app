import { useGetFilmsQuery } from '@/shared/api/baseApi';
import { FILMS_COLLECTIONS_LIST } from '@/shared/consts/constants';
import { StyledSpin } from '@/shared/ui';
import { FilmsList } from '@/widgets/films-list';
import { Alert, Space, type PaginationProps } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { PageHeader } from './PageHeader';

export const FilmsCollectionsPage = () => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);

  const handleChange: PaginationProps['onChange'] = page => {
    setCurrentPage(page);
  };

  const collection = FILMS_COLLECTIONS_LIST.find(
    item => item.url === location.pathname,
  );

  if (!collection) {
    return <div>Collection not found</div>;
  }

  const {
    data = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetFilmsQuery({
    type: collection.type,
    page: currentPage,
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [location]);

  // console.log('location: ', location);
  // console.log('data :', data);

  let content: React.ReactNode;

  if (isLoading) {
    content = <StyledSpin />;
  } else if (isSuccess) {
    content = (
      <Space direction="vertical">
        <PageHeader title={collection.title} />

        <FilmsList
          items={data.items}
          total={data.total}
          current={currentPage}
          pageSize={data.items.length || 0}
          onChange={handleChange}
        />
      </Space>
    );
  } else if (isError) {
    if ('status' in error && 'error' in error) {
      // it's FetchBaseQueryError
      content = (
        <Alert
          message={`Status: ${error.status}`}
          description={error.error}
          type="error"
        />
      );
    } else {
      // it's SerializedError
      content = (
        <Alert
          message="Unexpected error"
          description={error.message || 'Unknown error'}
          type="error"
        />
      );
    }
  }

  return <>{content}</>;
};
