import { Navigation } from '@/features/navigation';
import { Layout } from 'antd';
import { useState } from 'react';

export const LayoutSider = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout.Sider
      theme="light"
      collapsible
      collapsed={collapsed}
      onCollapse={value => setCollapsed(value)}
    >
      <Navigation />
    </Layout.Sider>
  );
};
