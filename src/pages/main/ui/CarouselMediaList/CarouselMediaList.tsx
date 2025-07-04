import { ErrorMessage } from '@/shared/ui';
import AcroolCarousel, { AcroolSlideImage } from '@acrool/react-carousel';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Flex, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import { useMediaContentLists } from '../../lib/hooks/useMediaContentLists';

export const CarouselMediaList = () => {
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
        // style={{
        //   height: isMobile ? '520px' : '352px',
        //   width: '100%',
        // }}
      />
    ));

  const carouselItems = [
    {
      title: 'Top 250 movies',
      url: '/films/collections/top-250-movies',
      data: serialize(top250MoviesResponse.data?.items),
    },
    {
      title: 'Top popular movies',
      url: '/films/collections/top-popular-movies',
      data: serialize(topPopularMoviesResponse.data?.items),
    },
    {
      title: 'Films',
      url: '/films',
      data: serialize(filmResponse.data?.items),
    },
    {
      title: 'Series',
      url: '/tv-series',
      data: serialize(tvSeriesResponse.data?.items),
    },
    {
      title: 'Cartoons',
      url: '/cartoons',
      data: serialize(cartoonsResponse.data?.items),
    },
  ];

  return (
    <>
      {carouselItems.map(carouselItem => (
        <Flex key={carouselItem.title} vertical gap={16}>
          <Typography.Title level={4}>
            <Link to={carouselItem.url}>
              {carouselItem.title} <ArrowRightOutlined />
            </Link>
          </Typography.Title>

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
    </>
  );
};
