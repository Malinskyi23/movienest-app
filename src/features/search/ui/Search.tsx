import { useGetFilmsQuery } from '@/shared/api/baseApi';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { AutoComplete, Spin } from 'antd';
import type { DefaultOptionType } from 'antd/es/select';
import { debounce } from 'lodash';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { selectQueryParams, setQueryParams } from '../model/queryParamsSlice';

const MIN_LENGTH = 2;
export const Search = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { keyword = '' } = useAppSelector(selectQueryParams);
  const [value, setValue] = React.useState(keyword);

  const { data, isFetching } = useGetFilmsQuery(
    { keyword },
    { skip: !keyword?.trim() },
  );

  const debouncedDispatch = React.useMemo(
    () =>
      debounce((value: string) => {
        if (value.trim().length >= MIN_LENGTH) {
          dispatch(setQueryParams({ keyword: value }));
        }
      }, 500),
    [dispatch],
  );

  const handleSearch = (value: string) => {
    setValue(value);
    debouncedDispatch(value);
  };

  const handleSelect = (
    _: string,
    option: DefaultOptionType & { id: number },
  ) => {
    const id = option.id;
    if (id) {
      setValue('');
      dispatch(setQueryParams({ keyword: '' }));
      navigate(`/films/${id}`);
    }
  };

  React.useEffect(() => {
    return () => {
      debouncedDispatch.cancel();
    };
  }, [debouncedDispatch]);

  return (
    <AutoComplete
      placeholder="Search for movies and TV series"
      style={{ width: '50%' }}
      size="large"
      value={value}
      options={
        keyword.trim()
          ? (data?.items.map(item => ({
              value:
                item.nameRu || item.nameEn || item.nameOriginal || 'Untitled',
              label:
                item.nameRu || item.nameEn || item.nameOriginal || 'Untitled',
              id: item.kinopoiskId,
            })) ?? [])
          : []
      }
      filterOption
      onSearch={handleSearch}
      onSelect={handleSelect}
      allowClear
      notFoundContent={isFetching ? <Spin size="small" /> : 'Content not found'}
    ></AutoComplete>
  );
};
