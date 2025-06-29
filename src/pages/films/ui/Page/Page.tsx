import { FILMS_LIST } from '@/shared/consts/constants';
import { FilmsList } from '@/widgets/films-list';
import { Flex } from 'antd';
import { useLocation } from 'react-router-dom';

import { PageHeader } from './PageHeader';

export const FilmsPage = () => {
  const location = useLocation();

  const film = FILMS_LIST.find(item => item.url === location.pathname);

  return (
    <Flex vertical gap={16}>
      <PageHeader title={film?.title || 'Unknown Collection | Untitled'} />
      <FilmsList />
    </Flex>
  );
};
