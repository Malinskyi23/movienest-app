import { LayoutFooter } from '@/widgets/layout-footer';
import { LayoutHeader } from '@/widgets/layout-header';
import { Sidebar } from '@/widgets/sidebar';
import { Container } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <Container fixed>
      <LayoutHeader />
      <Sidebar />
      <Outlet />
      <LayoutFooter />
    </Container>
  );
};
