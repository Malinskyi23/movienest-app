import { FilmDetailsPage } from '@/pages/film-details/ui/Page';
import { FilmsPage } from '@/pages/films';
import { FilmsCollectionsPage } from '@/pages/films-collections';
import { MainPage } from '@/pages/main';
import { StaffListPage } from '@/pages/staff-list/ui/Page';
import { StaffMemberDetailsPage } from '@/pages/staff-member-details/ui/Page';
import { FILM_COLLECTIONS_LIST, FILMS_LIST } from '@/shared/consts/constants';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { MainLayout } from './layouts/MainLayout';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: '/', element: <MainPage /> },
        ...FILM_COLLECTIONS_LIST.map(item => ({
          path: item.url,
          element: <FilmsCollectionsPage />,
        })),
        ...FILMS_LIST.map(item => ({
          path: item.url,
          element: <FilmsPage />,
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
