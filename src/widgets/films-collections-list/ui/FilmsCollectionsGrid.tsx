import { FilmCard } from '@/features/film-card';
import { Col, Row } from 'antd';
import React from 'react';

interface FilmsCollectionsGridProps {
  items: any[];
}

export const FilmsCollectionsGrid: React.FC<FilmsCollectionsGridProps> = ({
  items,
}) => {
  return (
    <Row gutter={[16, 16]}>
      {items.map(film => (
        <Col key={film.kinopoiskId} xs={24} sm={12} md={6}>
          <FilmCard item={film} />
        </Col>
      ))}
    </Row>
  );
};
