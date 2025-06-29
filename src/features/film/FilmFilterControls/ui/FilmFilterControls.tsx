import {
  resetFilters,
  setCountyId,
  setGenreId,
  setOrder,
  setYear,
  type FilmOrder,
} from '@/entitry/film/model/filmsSlice';
import type { CountryItem, GenreItem } from '@/shared/api/baseApi';
import { useAppDispatch } from '@/shared/lib/hooks';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Flex, Grid, Select } from 'antd';
// import type { DefaultOptionType } from 'antd/es/select';
import React from 'react';

const { useBreakpoint } = Grid;

type Props = {
  countryList: CountryItem[];
  genreList: GenreItem[];
  genreId?: number;
  countryId?: number;
  order?: FilmOrder;
  year?: number;
};

export const FilmFilterControls: React.FC<Props> = ({
  countryList,
  genreList,
  genreId,
  countryId,
  order,
  year,
}) => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const dispatch = useAppDispatch();

  return (
    // direction={isMobile ? 'vertical' : 'horizontal'}
    <Flex gap={8} justify="end">
      <Select<FilmOrder>
        placeholder="Sort by"
        value={order}
        optionFilterProp="label"
        onChange={value => {
          dispatch(setOrder(value));
        }}
        options={[
          { value: 'RATING', label: 'by rating' },
          { value: 'NUM_VOTE', label: 'by number of votes' },
        ]}
      />
      <Select<number>
        placeholder="Select a country"
        value={countryId}
        optionFilterProp="label"
        onChange={(
          value: number,
          // option?: DefaultOptionType | DefaultOptionType[],
        ) => {
          dispatch(setCountyId(value));
        }}
        options={countryList.map(item => ({
          value: item.id,
          label: item.country,
        }))}
      />
      <Select<number>
        placeholder="Select a genre"
        value={genreId}
        optionFilterProp="label"
        onChange={(value: number) => {
          dispatch(setGenreId(value));
        }}
        options={genreList.map(item => ({
          value: item.id,
          label: item.genre,
        }))}
      />
      <Select<number>
        placeholder="Select a year"
        optionFilterProp="label"
        value={year}
        onChange={(value: number) => {
          dispatch(setYear(value));
        }}
        options={new Array(60).fill(null).map((_, idx) => ({
          value: new Date().getFullYear() - idx,
          label: new Date().getFullYear() - idx,
        }))}
      />
      <Button
        icon={<CloseCircleOutlined />}
        type="link"
        onClick={() => {
          dispatch(resetFilters());
        }}
      >
        Reset filters
      </Button>
    </Flex>
  );
};
