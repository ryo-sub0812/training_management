import { memo, ReactNode, VFC } from 'react'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from '@chakra-ui/react'

import { SecondaryButton } from '../../atoms/button/SecondaryButton'

type Props = {
  title: string
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export const ModalLayout: VFC<Props> = memo((props) => {
  const { title, isOpen, onClose, children } = props

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
      autoFocus={false}
      size="md"
      isCentered
    >
      <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(4px)" />
      <ModalContent
        bg="white"
        borderRadius="2xl"
        borderWidth="2px"
        borderColor="purple.300"
        _dark={{ bg: 'gray.800', borderColor: 'purple.600' }}
        boxShadow="2xl"
        maxW="500px"
      >
        <ModalHeader
          textAlign="center"
          fontSize="xl"
          fontWeight="800"
          bgGradient="linear(to-r, purple.600, blue.600)"
          bgClip="text"
          _dark={{
            bgGradient: 'linear(to-r, purple.400, blue.400)',
            bgClip: 'text',
          }}
          pb={4}
          pt={6}
          data-testid="modal-title"
        >
          {title}
        </ModalHeader>
        <ModalCloseButton
          color="gray.500"
          _hover={{ color: 'red.500' }}
          _dark={{ color: 'gray.400', _hover: { color: 'red.400' } }}
          size="lg"
        />
        <ModalBody fontSize="15px" px={6} pb={6}>
          <Stack spacing={6}>{children}</Stack>
        </ModalBody>
        <ModalFooter justifyContent="center" pb={6} pt={0}>
          <SecondaryButton onClick={onClose}>戻る</SecondaryButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
})
