import { setType as collectionsSetType } from '@/entitry/film/model/filmCollectionsSlice';
import { setType as filmsSetType } from '@/entitry/film/model/filmsSlice';
import {
  FILM_COLLECTIONS_LIST,
  FILMS_LIST,
  iconComponents,
} from '@/shared/consts/constants';
import { useAppDispatch } from '@/shared/lib/hooks';
import { Divider, Menu, type MenuProps } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

type IconProps = {
  iconName: keyof typeof iconComponents;
};

const Icon: React.FC<IconProps> = ({ iconName }) => {
  const IconComponent = iconComponents[iconName];
  return IconComponent ? <IconComponent /> : null;
};

export const Navigation = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <>
      <Menu
        theme="light"
        mode="inline"
        onClick={({ key }) => {
          const type = FILM_COLLECTIONS_LIST.find(
            item => item.url === key,
          )?.type;

          if (type) {
            dispatch(collectionsSetType(type));
          }

          navigate(key);
        }}
        items={FILM_COLLECTIONS_LIST.map(item => ({
          key: item.url,
          label: item.title,
          icon: <Icon iconName={item.icon as keyof typeof iconComponents} />,
        }))}
      />
      <Divider />
      <Menu
        theme="light"
        mode="inline"
        onClick={({ key }) => {
          const type = FILMS_LIST.find(item => item.url === key)?.type;

          if (type) {
            dispatch(filmsSetType(type));
          }

          navigate(key);
        }}
        items={FILMS_LIST.map(item => ({
          key: item.url,
          label: item.title,
          icon: <Icon iconName={item.icon as keyof typeof iconComponents} />,
        }))}
      />
    </>
  );
};
