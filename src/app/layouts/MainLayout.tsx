import { LayoutContent } from '@/widgets/layout-content/ui/LayoutContent';
import { LayoutFooter } from '@/widgets/layout-footer';
import { LayoutHeader } from '@/widgets/layout-header';
import { LayoutSider } from '@/widgets/layout-sider';
import { Layout } from 'antd';
import React from 'react';

export const MainLayout = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <LayoutHeader />

      <Layout>
        <LayoutSider />
        <Layout>
          <LayoutContent />
          <LayoutFooter />
        </Layout>
      </Layout>
    </Layout>
  );
};
