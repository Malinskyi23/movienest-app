import { useGetFilmsQuery } from '@/shared/api/baseApi';
import React from 'react';

export const FilmsCollectionsPage = () => {
  const { data: films = [], isLoading } = useGetFilmsQuery({
    type: 'FAMILY',
    page: 2,
  });

  let content: React.ReactNode;

  if (isLoading) {
    content = 'Loading...';
  }

  return <>{content}</>;
};
