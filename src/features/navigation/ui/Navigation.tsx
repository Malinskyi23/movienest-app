import { setType as collectionsSetType } from '@/entitry/film/model/collectionsAndTopsSlice';
import {
  setType as filmsSetType,
  resetFilters,
} from '@/entitry/film/model/filmsSlice';
import {
  FILM_COLLECTIONS_LIST,
  FILMS_LIST,
  ICON_COMPONENTS,
} from '@/shared/consts/constants';
import { useAppDispatch } from '@/shared/lib/hooks';
import { Divider, Menu } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

type IconProps = {
  iconName: keyof typeof ICON_COMPONENTS;
};

const Icon: React.FC<IconProps> = ({ iconName }) => {
  const IconComponent = ICON_COMPONENTS[iconName];
  return IconComponent ? <IconComponent /> : null;
};

export const Navigation = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <>
      <Menu
        title="Misha"
        theme="light"
        mode="inline"
        onClick={({ key }) => {
          const type = FILMS_LIST.find(item => item.url === key)?.type;

          if (type) {
            dispatch(resetFilters());
            dispatch(filmsSetType(type));
          }

          navigate(key);
        }}
        items={[
          {
            key: 'videos',
            label: 'Videos',
            type: 'group',
            children: FILMS_LIST.map(item => ({
              key: item.url,
              label: item.title,
              icon: (
                <Icon iconName={item.icon as keyof typeof ICON_COMPONENTS} />
              ),
            })),
          },
        ]}
      />
      <Divider />
      <Menu
        title="Collections and Tops"
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
        items={[
          {
            key: 'CAT',
            label: 'Tops and Collections',
            type: 'group',
            children: FILM_COLLECTIONS_LIST.map(item => ({
              key: item.url,
              label: item.title,
              icon: (
                <Icon iconName={item.icon as keyof typeof ICON_COMPONENTS} />
              ),
            })),
          },
        ]}
      />
    </>
  );
};
