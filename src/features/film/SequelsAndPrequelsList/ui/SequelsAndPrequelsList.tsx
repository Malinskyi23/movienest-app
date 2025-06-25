import { useGetSequelsAndPrequelsQuery } from '@/shared/api/baseApi';
import { Alert, Avatar, List, Spin, Typography } from 'antd';
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
        <Typography.Title level={4} style={{ margin: 0 }}>
          Sequels and Prequels
        </Typography.Title>
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
                    <Avatar src={item.url} shape="square" size={128} />
                  </Link>
                }
                title={<Link to={`/films/${item.id}`}>{item.title}</Link>}
                description={item.type}
              />
            </List.Item>
          )}
        />
      </>
    );
  }

  return <>{content}</>;
};
