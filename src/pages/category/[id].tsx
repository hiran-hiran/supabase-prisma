import { useState } from 'react';
import type { NextPage } from 'next';
import {
  Button,
  Checkbox,
  Flex,
  Box,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useRecoilStateLoadable } from 'recoil';
import { useRouter } from 'next/router';
import { Category } from '@prisma/client';
import { useFieldArray, useForm } from 'react-hook-form';
import { categoryState } from '../../recoil/category';
import { createDefaultValues } from '../../components/category/functions';
import { axiosClient } from '../../lib/axios';

type FormData = {
  items: {
    name: string;
    amount: number;
    status: boolean;
  }[];
};

const Category: NextPage = () => {
  const [items, setItems] = useRecoilStateLoadable(categoryState);
  const { query } = useRouter();
  const [appendText, setAppendText] = useState('');

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { register, handleSubmit, resetField, control } = useForm<FormData>({
    defaultValues: createDefaultValues(items, query),
  });

  const { fields, append, prepend } = useFieldArray({
    control,
    name: 'items',
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await axiosClient.put('/api/items', {
        id: query.id,
        items: data.items,
      });

      onClose();
    } catch (error) {
      console.log('error', error);
    }
  });

  if (!items || items.state === 'loading') {
    return <Text>Loading</Text>;
  }

  if (items.state === 'hasError') {
    return <Text>Error</Text>;
  }

  const itemData = items.contents.find((item) => item.id === Number(query.id));

  return (
    <Box>
      <Text fontSize={'2xl'} textAlign={'center'}>
        {itemData.title}
      </Text>
      <Box textAlign={'right'}>
        <Button colorScheme='green' onClick={(data) => onSubmit(data)}>
          保存
        </Button>
      </Box>
      <VStack spacing={4} mt={4}>
        {fields.map((field, index) => (
          <Flex key={field.id} justify={'space-between'} w='full'>
            <Checkbox {...register(`items.${index}.status`)}>{field.name}</Checkbox>
            <Input
              {...register(`items.${index}.amount`)}
              w={20}
              type={'number'}
              p={2}
              textAlign={'center'}
            />
          </Flex>
        ))}
      </VStack>

      <Flex mt={5} justify='center'>
        <Button colorScheme='blue' onClick={onOpen}>
          追加
        </Button>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent color='gray.800' w='90%'>
          <ModalHeader>追加</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              onChange={(e) => setAppendText(e.target.value)}
              placeholder='食材'
              type='text'
              required
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='gray' mr={3} onClick={onClose}>
              キャンセル
            </Button>
            <Button
              colorScheme='blue'
              onClick={() => append({ name: appendText, amount: 0, status: false })}
            >
              登録
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Category;
