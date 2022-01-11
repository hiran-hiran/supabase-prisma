import React, { VFC } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
} from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import { authUserAtom } from '../../recoil/atoms';
import { useForm } from 'react-hook-form';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

type FormData = {
  category: string;
};

export const CategoryModal: VFC<Props> = (props) => {
  const authUser = useRecoilValue(authUserAtom);
  // console.log({ authUser });

  const { register, handleSubmit, resetField } = useForm<FormData>();

  const onSubmit = handleSubmit((data) => {
    if (!data.category) {
      return;
    }
    console.log({ data });
    props.onClose();
    resetField('category');
  });

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent color='gray.800'>
        <ModalHeader>カテゴリの追加</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input {...register('category')} placeholder='カテゴリー' type='text' required />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='gray' mr={3} onClick={props.onClose}>
            キャンセル
          </Button>
          <Button colorScheme='blue' onClick={onSubmit}>
            登録
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
