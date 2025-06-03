import { FilmDetailsPage } from '@/pages/film-details/ui/Page';
import { FilmsListPage } from '@/pages/films-list';
import { FilmsListTopPage } from '@/pages/films-list-top';
import { FilmsPage } from '@/pages/films/ui/Page';
import { StaffListPage } from '@/pages/staff-list/ui/Page';
import { StaffMemberDetailsPage } from '@/pages/staff-member-details/ui/Page';
import { FILMS_LIST, FILMS_TOP_LIST } from '@/shared/consts/constants';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { MainLayout } from './layouts/MainLayout';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: '/', element: <FilmsPage /> },
        ...FILMS_TOP_LIST.map(item => ({
          path: item.url,
          element: <FilmsListTopPage />,
        })),
        ...FILMS_LIST.map(item => ({
          path: item.url,
          element: <FilmsListPage />,
        })),
        { path: '/films/:id', element: <FilmDetailsPage /> },
        { path: '/staff-list', element: <StaffListPage /> },
        { path: '/staff-list/:id', element: <StaffMemberDetailsPage /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
