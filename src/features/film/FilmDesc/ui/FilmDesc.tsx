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
      bordered
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
            <Space wrap>
              {item.countries.map(({ country }) => (
                <React.Fragment key={country}>{country}</React.Fragment>
              ))}
            </Space>
          ),
        },
        {
          key: '3',
          span: 3,
          label: 'Genre',
          children: (
            <Space wrap>
              {item.genres.map(({ genre }) => (
                <React.Fragment key={genre}>{genre}</React.Fragment>
              ))}
            </Space>
          ),
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
        // {
        //   key: '1',
        //   span: 3,
        //   label: 'Description',
        //   children: item.description ? item.description : 'No description',
        // },
      ]}
    />
  );

  return <>{content}</>;
};
