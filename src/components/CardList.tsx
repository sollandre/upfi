import { Grid, GridItem, SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  // TODO MODAL USEDISCLOSURE
  const { isOpen ,onClose, onOpen } = useDisclosure()
  // TODO SELECTED IMAGE URL STATE
  const [imgUrl, setImgUrl] = useState('')
  // TODO FUNCTION HANDLE VIEW IMAGE
  
  return (
    <>
      {/* TODO CARD GRID */}
      <Grid
        templateColumns={'1fr 1fr 1fr'}
        gap={10}
      >
        {
          cards.map((image) => {
            return (              
              <GridItem key={image.id}>
                <Card data={image} viewImage={() => {
                  onOpen() 
                  setImgUrl(image.url)
                }}/>
              </GridItem>
            )
          })
        }
      </Grid>
      {/* TODO MODALVIEWIMAGE */}
      <ModalViewImage imgUrl={imgUrl} isOpen={isOpen} onClose={onClose} />
    </>
  );
}
