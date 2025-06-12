import { Pagination } from 'antd';
import React from 'react';

interface FilmsCollectionsPaginationProps {
  total: number;
  current: number;
  pageSize: number;
  onChange: (page: number, pageSize: number) => void;
}

export const FilmsCollectionsPagination: React.FC<
  FilmsCollectionsPaginationProps
> = ({ total, current, pageSize, onChange }) => {
  return (
    <Pagination
      total={total}
      current={current}
      pageSize={pageSize}
      onChange={onChange}
      showSizeChanger={false}
    />
  );
};
