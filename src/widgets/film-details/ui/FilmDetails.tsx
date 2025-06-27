import { FilmDesc } from '@/features/film/FilmDesc';
import { SequelsAndPrequelsList } from '@/features/film/SequelsAndPrequelsList';
import { StaffDesc } from '@/features/staff/StaffDesc';
import { VideoPlayer } from '@/features/video-player';
import { useGetFilmByIdQuery } from '@/shared/api/baseApi';
import { ArrowLeftOutlined } from '@ant-design/icons';
import {
  Alert,
  Button,
  Card,
  Col,
  Flex,
  Image,
  Row,
  Space,
  Spin,
  Typography,
} from 'antd';
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
        <Card>
          <Flex vertical gap={16} align="center">
            <Space style={{ width: '100%' }}>
              <Button
                color="primary"
                variant="text"
                icon={<ArrowLeftOutlined />}
                onClick={() => navigate(-1)}
              />
              <Typography.Title level={4} style={{ margin: 0 }}>
                {result.data.nameRu}
              </Typography.Title>
            </Space>
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Image src={result.data.posterUrl} alt={result.data.nameRu} />
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
              Watch online
            </Typography.Title>
            <VideoPlayer kpId={filmId} />
            <SequelsAndPrequelsList id={id} />
          </Flex>
        </Card>
      </Spin>
    );
  }

  return <>{content}</>;
};
