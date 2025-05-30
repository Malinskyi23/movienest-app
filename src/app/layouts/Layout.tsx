import { LayoutFooter } from '@/widgets/layout-footer';
import { LayoutHeader } from '@/widgets/layout-header';
import { Sidebar } from '@/widgets/sidebar';
import { Box, Container } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <Container fixed>
      <Box sx={{ p: 4 }}></Box>
      <LayoutHeader />
      <Sidebar />
      <Outlet />
      <LayoutFooter />
    </Container>
  );
};
