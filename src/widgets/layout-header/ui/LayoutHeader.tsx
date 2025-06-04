import { Layout, Typography } from 'antd';
import React from 'react';

export const LayoutHeader = () => {
  const styles = {
    backgroundColor: '#001529',
    display: 'flex',
    alignItems: 'center',
  };

  return (
    <Layout.Header style={styles}>
      <Typography.Title level={3} style={{ color: '#ffffff', margin: 0 }}>
        movienest
      </Typography.Title>
    </Layout.Header>
  );
};
