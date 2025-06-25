import { FilmImage } from '@/entitry/film';
import { FilmCard } from '@/features/film-card';
import { FilmDesc } from '@/features/film/FilmDesc';
import { SequelsAndPrequelsList } from '@/features/film/SequelsAndPrequelsList';
import { StaffDesc } from '@/features/staff/StaffDesc';
import {
  useGetFilmByIdQuery,
  useGetSequelsAndPrequelsQuery,
  useGetStaffQuery,
} from '@/shared/api/baseApi';
import { ArrowLeftOutlined, ExportOutlined } from '@ant-design/icons';
import {
  Alert,
  Button,
  Card,
  Col,
  Descriptions,
  Flex,
  Image,
  Row,
  Space,
  Spin,
  Typography,
} from 'antd';
import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export const FilmDetails = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const filmId = Number(id);

  const filmResult = useGetFilmByIdQuery(filmId, {
    skip: !id || isNaN(filmId),
  });
  const sequelsAndPrequelsResult = useGetSequelsAndPrequelsQuery(filmId, {
    skip: !id || isNaN(filmId),
  });

  const staffResult = useGetStaffQuery(
    { filmId },
    {
      skip: !id || isNaN(filmId),
    },
  );

  const isLoading =
    filmResult.isLoading &&
    // sequelsAndPrequelsResult.isLoading &&
    staffResult.isLoading;

  const isError =
    filmResult.isError &&
    // sequelsAndPrequelsResult.isError &&
    staffResult.isError;

  const isSuccess =
    filmResult.isSuccess &&
    // sequelsAndPrequelsResult.isSuccess &&
    staffResult.isSuccess;

  let content: React.ReactNode;

  if (isLoading) {
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
  } else if (isError) {
    content = (
      <Alert
        message="Unexpected error"
        description="Unknown error"
        type="error"
      />
    );
  } else if (isSuccess) {
    content = (
      <Flex vertical gap={16}>
        <Space>
          <Button
            color="primary"
            variant="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(-1)}
          />
          <Typography.Title level={4} style={{ margin: 0 }}>
            {filmResult.data.nameRu}
          </Typography.Title>
        </Space>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Image
              src={filmResult.data.posterUrl}
              alt={filmResult.data.nameRu}
            />
          </Col>
          <Col span={16}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <FilmDesc item={filmResult.data} />
                {/* <Descriptions
                  bordered
                  items={[
                    {
                      key: '1',
                      span: 3,
                      label: 'Year',
                      children: filmResult.data.year,
                    },
                    {
                      key: '2',
                      span: 3,
                      label: 'Country',
                      children: (
                        <Space>
                          {filmResult.data.countries.map(
                            ({ country }) => `${country}`,
                          )}
                        </Space>
                      ),
                    },
                    {
                      key: '3',
                      span: 3,
                      label: 'Genre',
                      children: (
                        <Space>
                          {filmResult.data.genres.map(
                            ({ genre }) => `${genre}`,
                          )}
                        </Space>
                      ),
                    },

                    {
                      key: '5',
                      span: 3,
                      label: 'Duration',
                      children: `${filmResult.data.filmLength} min`,
                    },
                    {
                      key: '2',
                      span: 3,
                      label: 'Links',
                      children: (
                        <Button
                          type="link"
                          target="_blank"
                          href={`https://www.imdb.com/title/${filmResult.data.imdbId}`}
                          icon={<ExportOutlined />}
                          iconPosition="end"
                        >
                          IMBD
                        </Button>
                      ),
                    },
                  ]}
                /> */}
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
        <video></video>
        <SequelsAndPrequelsList id={id} />
      </Flex>
    );
  }

  return <>{content}</>;
};
