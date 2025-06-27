import { Search } from '@/features/search';
import { Flex, Layout, Typography } from 'antd';
import React from 'react';

export const LayoutHeader = () => {
  const styles = {
    // backgroundColor: '#001529',
    display: 'flex',
    alignItems: 'center',
  };

  return (
    <Layout.Header style={styles}>
      <Flex justify="space-between" style={{ width: '100%' }}>
        <Typography.Title level={3} style={{ color: '#ffffff', margin: 0 }}>
          movienest
        </Typography.Title>
        <Search />
      </Flex>
    </Layout.Header>
  );
};
