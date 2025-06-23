import { FilmImage } from '@/entitry/film';
import { Badge, Card, Flex, Space, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import styles from './FilmCard.module.css';

export const FilmCard = ({ item }: { item: any }) => {
  return (
    <Link to={`/films/${item.kinopoiskId}`}>
      <Card hoverable>
        <Flex vertical gap={8} align="center">
          <Badge.Ribbon text={item.type}>
            <FilmImage src={item.posterUrlPreview} />
          </Badge.Ribbon>

          <Space direction="vertical" style={{ width: '100%' }}>
            <Typography.Text ellipsis>
              <Link to={`/films/${item.kinopoiskId}`}>
                {item.nameEn ? item.nameEn : item.nameRu}{' '}
              </Link>
            </Typography.Text>
            {item.year &&
              item.countries.length !== 0 &&
              item.genres.length !== 0 && (
                <Space>
                  <Typography.Text type="secondary">
                    {item.year}
                  </Typography.Text>
                  <Typography.Text type="secondary">
                    {item.countries[0].country}
                  </Typography.Text>
                  <Typography.Text type="secondary">
                    {item.genres[0].genre}
                  </Typography.Text>
                </Space>
              )}
          </Space>
        </Flex>
      </Card>
    </Link>
  );
};
