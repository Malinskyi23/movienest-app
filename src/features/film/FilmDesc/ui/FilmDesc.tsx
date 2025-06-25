import { type FilmDetails } from '@/shared/api/baseApi';
import { ExportOutlined } from '@ant-design/icons';
import { Button, Descriptions, Space } from 'antd';
import React from 'react';

type Props = {
  item: FilmDetails;
};

export const FilmDesc: React.FC<Props> = ({ item }) => {
  const content: React.ReactNode = (
    <Descriptions
      // bordered
      items={[
        {
          key: '1',
          span: 3,
          label: 'Year',
          children: item.year,
        },
        {
          key: '2',
          span: 3,
          label: 'Country',
          children: (
            <div>
              {item.countries.map(({ country }) => (
                <Space key={country}>{country}</Space>
              ))}
            </div>
          ),
        },
        {
          key: '3',
          span: 3,
          label: 'Genre',
          children: item.genres.map(({ genre }) => (
            <Space key={genre}>{genre}</Space>
          )),
        },

        {
          key: '5',
          span: 3,
          label: 'Duration',
          children: `${item.filmLength} min`,
        },
        {
          key: '2',
          span: 3,
          label: 'Links',
          children: (
            <Button
              type="link"
              target="_blank"
              href={`https://www.imdb.com/title/${item.imdbId}`}
              icon={<ExportOutlined />}
              iconPosition="end"
            >
              IMBD
            </Button>
          ),
        },
        {
          key: '1',
          span: 3,
          label: 'Description',
          children: item.description ? item.description : 'No description',
        },
      ]}
    />
  );

  return <>{content}</>;
};
