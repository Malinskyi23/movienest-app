import { FilmDesc } from '@/features/film/FilmDesc';
import { SequelsAndPrequelsList } from '@/features/film/SequelsAndPrequelsList';
import { StaffDesc } from '@/features/staff/StaffDesc';
import { VideoPlayer } from '@/features/video-player';
import { useGetFilmByIdQuery } from '@/shared/api/baseApi';
import { PosterImage } from '@/shared/ui';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Alert, Button, Col, Flex, Row, Space, Spin, Typography } from 'antd';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const FilmDetails = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const filmId = Number(id);

  const result = useGetFilmByIdQuery(filmId, {
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
      <Spin spinning={result.isFetching} tip="Fetching content...">
        <Flex vertical gap={16}>
          <Space>
            <Button
              color="primary"
              variant="text"
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate(-1)}
            >
              Back to
            </Button>
          </Space>
          <Typography.Title level={3} style={{ margin: 0 }}>
            {result.data.nameRu}
          </Typography.Title>

          <Row gutter={[16, 16]}>
            <Col span={8}>
              <PosterImage src={result.data.posterUrl} />
            </Col>
            <Col span={16}>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <FilmDesc item={result.data} />
                </Col>
                <Col span={12}>
                  <StaffDesc id={id} />
                </Col>
              </Row>
            </Col>
          </Row>

          <Typography.Title level={5} style={{ margin: 0 }}>
            Film Description
          </Typography.Title>
          <Typography>
            {result.data.description
              ? result.data.description
              : 'No description'}
          </Typography>

          <Typography.Title level={5} style={{ margin: 0 }}>
            Watch online
          </Typography.Title>

          <VideoPlayer kpId={filmId} />

          <Typography.Title level={4} style={{ margin: 0 }}>
            Sequels and Prequels
          </Typography.Title>

          <SequelsAndPrequelsList id={id} />
        </Flex>
      </Spin>
    );
  }

  return <>{content}</>;
};
