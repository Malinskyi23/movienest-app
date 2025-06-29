import { Search } from '@/features/search';
import { LinuxOutlined } from '@ant-design/icons';
import { Flex, Layout, Typography } from 'antd';
import { Link } from 'react-router-dom';

export const LayoutHeader = () => {
  const styles = {
    // backgroundColor: '#001529',
    display: 'flex',
    alignItems: 'center',
  };

  return (
    <Layout.Header style={styles}>
      <Flex justify="space-between" style={{ width: '100%' }}>
        <Link to="/">
          <Typography.Title level={3} style={{ color: '#ffffff', margin: 0 }}>
            <LinuxOutlined />
            movienest
          </Typography.Title>
        </Link>
        <Search />
      </Flex>
    </Layout.Header>
  );
};
