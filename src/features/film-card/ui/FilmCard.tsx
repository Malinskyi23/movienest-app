import { Card, Flex, Rate, Space, Tooltip, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import styles from './FilmCard.module.css';

export const FilmCard = ({ item }: { item: any }) => {
  return (
    <Link to={`/films/${item.kinopoiskId}`}>
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
            item.ratingKinopoisk && (
              <Tooltip
                placement="bottom"
                title={`${item.ratingKinopoisk} / 10`}
              >
                <div>
                  <Rate disabled allowHalf value={item.ratingKinopoisk / 2} />
                </div>
              </Tooltip>
            )
          }
        ></Card.Meta>
      </Card>
    </Link>
  );
};
