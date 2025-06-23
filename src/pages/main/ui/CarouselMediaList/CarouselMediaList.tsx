import { ErrorMessage } from '@/shared/ui';
import AcroolCarousel, { AcroolSlideImage } from '@acrool/react-carousel';
import { Flex, Grid, Typography } from 'antd';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useMediaContentLists } from '../../lib/hooks/useMediaContentLists';

const { useBreakpoint } = Grid;

export const CarouselMediaList = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const navigate = useNavigate();
  const {
    topPopularMoviesResponse,
    top250MoviesResponse,
    tvSeriesResponse,
    filmResponse,
    cartoonsResponse,
    isFetching,
    error,
  } = useMediaContentLists();

  // TODO: add skeleton
  if (isFetching) return <>Skeleton</>;

  // TODO: add error component
  if (error) return <ErrorMessage />;

  // serialize data for carousel
  const serialize = data =>
    data.map(row => (
      <AcroolSlideImage
        key={row.id}
        imageUrl={row.posterUrlPreview}
        onClick={() => navigate(`/films/${row.kinopoiskId}`)}
        style={{
          height: isMobile ? '520px' : '352px',
          width: isMobile ? '100%' : '230px',
        }}
      />
    ));

  const carouselItems = [
    {
      title: 'Top 250 movies',
      url: '/films/collections/top-250-movies',
      data: serialize(top250MoviesResponse.data.items),
    },
    {
      title: 'Top popular movies',
      url: '/films/collections/top-popular-movies',
      data: serialize(topPopularMoviesResponse.data.items),
    },
    {
      title: 'Films',
      url: '/films',
      data: serialize(filmResponse.data.items),
    },
    {
      title: 'Series',
      url: '/tv-series',
      data: serialize(tvSeriesResponse.data.items),
    },
    {
      title: 'Cartoons',
      url: '/cartoons',
      data: serialize(cartoonsResponse.data.items),
    },
  ];

  return (
    <Flex vertical gap={16}>
      <Typography.Title style={{ margin: 0 }}>
        Top Movies, Series & Cartoons
      </Typography.Title>
      {carouselItems.map(carouselItem => (
        <Flex key={carouselItem.title} vertical gap={16}>
          <Link to={carouselItem.url}> {carouselItem.title} </Link>

          <AcroolCarousel
            // height={2 / 3}
            data={carouselItem.data}
            slidesPerView={1} // for mobile 1
            isEnableAutoPlay
            isEnableNavButton
            isEnableLoop
            autoPlayTime={3000}
            breakpoints={{
              375: { isEnableAutoPlay: false },
              768: {
                slidesPerView: 5,
              },
            }}
          />
        </Flex>
      ))}
    </Flex>
  );
};
