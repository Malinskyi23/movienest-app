import { Layout, theme } from 'antd';
import { Outlet } from 'react-router-dom';

export const LayoutContent = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const styles = {
    margin: '24px auto',
    padding: 24,
    minHeight: 280,
    maxWidth: 1200,
    width: '100%',
    background: colorBgContainer,
    // borderRadius: borderRadiusLG,
  };

  return (
    <Layout.Content style={styles}>
      <Outlet />
    </Layout.Content>
  );
};
