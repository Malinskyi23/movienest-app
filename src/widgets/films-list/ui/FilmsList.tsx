import { FilmCard } from '@/features/film-card';
import { Col, Row } from 'antd';
import React from 'react';

import { FilmsLlistPagination } from './FilmsLlistPagination';

interface FilmsListProps {
  items: any[];
  total: number;
  current: number;
  pageSize: number;
  onChange: (page: number, pageSize: number) => void;
}

export const FilmsList: React.FC<FilmsListProps> = ({
  items,
  total,
  current,
  pageSize,
  onChange,
}) => {
  return (
    <Row gutter={[16, 16]}>
      {items.map(film => (
        <Col key={film.kinopoiskId} xs={24} sm={12} md={6} lg={4}>
          <FilmCard item={film} />
        </Col>
      ))}
      <Col span={24}>
        <FilmsLlistPagination
          total={total}
          current={current}
          pageSize={pageSize}
          onChange={onChange}
        />
      </Col>
    </Row>
  );
};
