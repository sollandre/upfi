import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';


type ApiImagesResponse = {
  data: {
    ts: number;
    id: string;
    title: string;
    description: string;
    url: string;
  }[];
  after: string | null;
}

export default function Home(): JSX.Element {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    // TODO AXIOS REQUEST WITH PARAM
    ({ pageParam = null }) => {
      return api.get<ApiImagesResponse>('/api/images',{
        params:{
          after: pageParam
        }
      })
    }
    ,
    // TODO GET AND RETURN NEXT PAGE PARAM
    {
      getNextPageParam: (response) => {
        const page = response.data
        return page ? page.after : null
      }
    }
  );

  const formattedData = useMemo(() => {
    // TODO FORMAT AND FLAT DATA ARRAY
    if(!data){
      return
    }
    return data.pages.flatMap((page) => page.data.data).flat()
  }, [data]);
  // TODO RENDER LOADING SCREEN


  // TODO RENDER ERROR SCREEN

  return (
    <>
      <Header />
        {/* TODO RENDER LOAD MORE BUTTON IF DATA HAS NEXT PAGE */
          isLoading ? 
            <Loading />
          : isError ?
            <Error />
          :
          <Box maxW={1120} px={20} mx="auto" my={20}>
            <CardList cards={formattedData} />
            {hasNextPage &&
              <Button
                my={10}
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
              >
                {
                  isFetchingNextPage ?
                  'Carregando...' :
                  'Carregar mais'
                }
              </Button>
            }
          </Box>
        }
    </>
  );
}
