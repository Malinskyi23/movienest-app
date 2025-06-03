import { Layout, theme } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';

export const LayoutContent = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const styles = {
    margin: '24px 16px',
    padding: 24,
    minHeight: 280,
    background: colorBgContainer,
    borderRadius: borderRadiusLG,
  };
  return (
    <Layout.Content style={styles}>
      <Outlet />
    </Layout.Content>
  );
};
