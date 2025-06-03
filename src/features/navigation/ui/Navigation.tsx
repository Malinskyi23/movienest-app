import {
  FILMS_LIST,
  FILMS_TOP_LIST,
  iconComponents,
} from '@/shared/consts/constants';
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

  const handler: MenuProps['onClick'] = ({ key }) => {
    if (key) navigate(key);
  };

  return (
    <>
      <Menu
        theme="light"
        mode="inline"
        onClick={handler}
        items={FILMS_TOP_LIST.map(item => ({
          key: item.url,
          label: item.title,
          icon: <Icon iconName={item.icon as keyof typeof iconComponents} />,
        }))}
      />
      <Divider />
      <Menu
        theme="light"
        mode="inline"
        onClick={handler}
        items={FILMS_LIST.map(item => ({
          key: item.url,
          label: item.title,
          icon: <Icon iconName={item.icon as keyof typeof iconComponents} />,
        }))}
      />
    </>
  );
};
