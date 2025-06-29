import { PosterImage } from '@/shared/ui';
import { StarFilled } from '@ant-design/icons';
import { Badge, Card, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';

export const FilmCard = ({ item }: { item: any }) => {
  return (
    <Link to={`/films/${item.kinopoiskId}`}>
      <Badge.Ribbon
        text={
          item.ratingKinopoisk ? (
            <>
              <StarFilled style={{ color: 'yellow' }} /> {item.ratingKinopoisk}{' '}
              / 10
            </>
          ) : (
            'N/A'
          )
        }
      >
        <Card cover={<PosterImage src={item.posterUrl} />} hoverable>
          <Card.Meta
            title={
              item.nameRu || item.nameEn || item.nameOriginal || 'Untitled'
            }
            description={
              item.year &&
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
              )
            }
          />
        </Card>
      </Badge.Ribbon>
    </Link>
  );
};
