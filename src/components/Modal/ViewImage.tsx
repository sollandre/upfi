import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
  Flex,
  VStack,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  // TODO MODAL WITH IMAGE AND EXTERNAL LINK
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent
        w='auto'
        maxH='600px'
        maxW='900px'
      >
        <ModalBody
          backgroundColor={'pGray.800'}
          py='0px'
          px='0px'
        >
          <VStack align='center'>
            <Image 
              src={imgUrl}
              fit='cover'
              maxH='600px'
              maxW='900px'
            />
            <Link 
              href={imgUrl} 
              isExternal
              alignSelf='start'
              fontSize='14px'
              p='.5rem'
            >Abrir original</Link>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
