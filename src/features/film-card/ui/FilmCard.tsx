import { Badge, Card, Rate, Space, Tooltip, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import styles from './FilmCard.module.css';

export const FilmCard = ({ item }: { item: any }) => {
  return (
    <Link to={`/films/${item.kinopoiskId}`}>
      <Badge.Ribbon text={item.type}>
        <Card
          hoverable
          cover={
            <img
              src={item.posterUrl}
              alt={item.nameEn ? item.nameEn : item.nameRu}
              // className={styles.img}
            />
          }
        >
          <Card.Meta
            title={
              <Typography.Text>
                <Link to={`/films/${item.kinopoiskId}`}>
                  {item.nameEn ? item.nameEn : item.nameRu}{' '}
                </Link>
              </Typography.Text>
            }
            description={
              <Space direction="vertical">
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

                {item.ratingKinopoisk && (
                  <Space direction="vertical">
                    <Space>
                      <Typography.Text>Movie rating:</Typography.Text>
                      <Typography.Text strong>
                        {item.ratingKinopoisk}
                      </Typography.Text>
                    </Space>
                    <Tooltip
                      placement="bottom"
                      title={`${item.ratingKinopoisk} / 10`}
                    >
                      <div>
                        <Rate
                          disabled
                          allowHalf
                          value={item.ratingKinopoisk / 2}
                        />
                      </div>
                    </Tooltip>{' '}
                  </Space>
                )}
              </Space>
            }
          ></Card.Meta>
        </Card>
      </Badge.Ribbon>
    </Link>
  );
};
