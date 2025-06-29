import { FILM_COLLECTIONS_LIST } from '@/shared/consts/constants';
import { FilmsCollectionsList } from '@/widgets/films-collections-list';
import { Flex } from 'antd';
import { useLocation } from 'react-router-dom';

import { PageHeader } from './PageHeader';

export const FilmsCollectionsPage = () => {
  const location = useLocation();

  const collection = FILM_COLLECTIONS_LIST.find(
    item => item.url === location.pathname,
  );

  return (
    <Flex vertical gap={16}>
      <PageHeader
        title={collection?.title || 'Unknown Collection | Untitled'}
      />
      <FilmsCollectionsList />
    </Flex>
  );
};
