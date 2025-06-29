import { useGetSequelsAndPrequelsQuery } from '@/shared/api/baseApi';
import { PosterImage } from '@/shared/ui';
import { Alert, Card, List, Spin } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  id?: string;
};

export const SequelsAndPrequelsList: React.FC<Props> = ({ id }) => {
  const filmId = Number(id);

  const result = useGetSequelsAndPrequelsQuery(filmId, {
    skip: !id || isNaN(filmId),
  });

  let content: React.ReactNode;
  if (result.isLoading) {
    content = (
      <Spin tip="Loading content..." size="large">
        <div
          style={{
            padding: 50,
            background: 'rgba(0, 0, 0, 0.05)',
            borderRadius: 4,
          }}
        />
      </Spin>
    );
  } else if (result.isError) {
    content = (
      <Alert
        message="Unexpected error"
        description="Unknown error"
        type="error"
      />
    );
  } else if (result.isSuccess) {
    content = (
      <>
        <List
          itemLayout="horizontal"
          dataSource={result.data.map(datum => ({
            title: datum.nameRu,
            url: datum.posterUrlPreview,
            type: datum.relationType,
            id: datum.kinopoiskId,
          }))}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Link to={`/films/${item.id}`}>
                    <Card
                      hoverable
                      variant="borderless"
                      styles={{ body: { padding: 0 } }}
                    >
                      <PosterImage src={item.url} height={128} />
                    </Card>
                  </Link>
                }
                title={<Link to={`/films/${item.id}`}>{item.title}</Link>}
                description={
                  item.type.charAt(0).toUpperCase() +
                  item.type.slice(1).toLowerCase()
                }
              />
            </List.Item>
          )}
        />
      </>
    );
  }

  return <>{content}</>;
};
