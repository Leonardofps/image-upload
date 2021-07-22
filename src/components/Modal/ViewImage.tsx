import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
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
  const handleCloseImageModal = (): void => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} isCentered onClose={handleCloseImageModal}>
      <ModalOverlay />
      <ModalContent mx="auto" w="auto" h="auto" maxW="900px" maxH="600px">
        <ModalBody p="0">
          <Image src={imgUrl} borderTopRadius="sm" />
        </ModalBody>
        <ModalFooter
          bgColor="pGray.800"
          borderBottomRadius="md"
          h="100%"
          maxH={2}
        >
          <Link
            fontWeight="400"
            fontSize="14px"
            href={imgUrl}
            mr="auto"
            isExternal
          >
            Abrir original
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
