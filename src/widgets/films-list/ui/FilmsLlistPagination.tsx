import { Pagination } from 'antd';
import React from 'react';

interface FilmsLlistPaginationProps {
  total: number;
  current: number;
  pageSize: number;
  onChange: (page: number, pageSize: number) => void;
}

export const FilmsLlistPagination: React.FC<FilmsLlistPaginationProps> = ({
  total,
  current,
  pageSize,
  onChange,
}) => {
  return (
    <Pagination
      total={total}
      current={current}
      pageSize={pageSize}
      onChange={onChange}
    />
  );
};
