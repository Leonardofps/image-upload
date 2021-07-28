import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

interface Images {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface GetImageProps {
  data: Images[];
  after: string | null;
}

export default function Home(): JSX.Element {
  const fetchImages = async ({ pageParam = null }): Promise<GetImageProps> => {
    const { data } = await api.get('/api/images', {
      params: {
        after: pageParam,
      },
    });

    return data;
  };

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', fetchImages, {
    getNextPageParam: lastPage => lastPage?.after || null,
  });

  const formattedData = useMemo(() => {
    const dataFormatted = data?.pages.map(dataResult => dataResult.data).flat();
    return dataFormatted;
  }, [data]);

  if (isLoading && !isError) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />

        {hasNextPage && (
          <Button onClick={() => fetchNextPage()}>
            {isFetchingNextPage
              ? 'Carregando...'
              : hasNextPage && 'Carregar mais'}
          </Button>
        )}
      </Box>
    </>
  );
}
