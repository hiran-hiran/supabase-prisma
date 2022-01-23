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
import { axiosClient } from '../../lib/axios';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  refresh: () => void;
};

type FormData = {
  category: string;
};

export const CategoryModal: VFC<Props> = (props) => {
  const authUser = useRecoilValue(authUserAtom);

  const { register, handleSubmit, resetField } = useForm<FormData>();

  const onSubmit = handleSubmit(async (data) => {
    if (!data.category) {
      return;
    }

    try {
      const res = await axiosClient.post('/api/category', {
        authUserId: authUser.id,
        title: data.category,
      });

      if (res.status === 200) {
        props.onClose();
        resetField('category');
        props.refresh();
      }
    } catch (error) {
      console.log('error', error);
    }
  });

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent color='gray.800' w='90%'>
        <ModalHeader>追加</ModalHeader>
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
