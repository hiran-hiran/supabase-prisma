/* eslint-disable react/display-name */
import { memo, useState } from 'react';
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
  HStack,
  Spacer,
} from '@chakra-ui/react';
import { useRecoilRefresher_UNSTABLE, useRecoilStateLoadable } from 'recoil';
import { useRouter } from 'next/router';
import { useFieldArray, useForm } from 'react-hook-form';
import { categoryState } from '../../recoil/category';
import { createDefaultValues } from '../../components/category/functions';
import { axiosClient } from '../../lib/axios';
import dayjs from 'dayjs';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { DeleteIcon } from '@chakra-ui/icons';
import { CategoryTitle } from '../../components/category';

type FormData = {
  items: {
    id: string;
    name: string;
    amount: number;
    status: boolean;
  }[];
};

const CategoryId: NextPage = memo(() => {
  const { query } = useRouter();
  const [items, _] = useRecoilStateLoadable(categoryState);
  const refresh = useRecoilRefresher_UNSTABLE(categoryState);
  const [appendText, setAppendText] = useState('');

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { register, handleSubmit, control, watch } = useForm<FormData>({
    defaultValues: createDefaultValues(items, query),
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'items',
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await axiosClient.put('/api/items', {
        id: query.id,
        items: data.items,
      });

      if (res.status === 200) {
        refresh();
      }
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

  const handleOnDragEnd = ({ source, destination }) => {
    if (destination) {
      move(source.index, destination.index);
    }
  };

  return (
    <Box>
      <CategoryTitle title={itemData.title} />
      <Spacer h={5} />
      <Flex justifyContent={'space-between'} align={'center'}>
        <Text>{dayjs(itemData.updatedAt).format('YYYY年M月DD日 HH:mm')}</Text>
        <Button colorScheme='green' onClick={(data) => onSubmit(data)}>
          保存
        </Button>
      </Flex>
      <Spacer h={5} />
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId='categoryItems'>
          {(provided) => (
            <VStack spacing={4} {...provided.droppableProps} ref={provided.innerRef}>
              {fields.map((field, index) => {
                return (
                  <Draggable key={field.id} draggableId={field.id} index={index}>
                    {(provided) => (
                      <Flex
                        key={field.id}
                        justify={'space-between'}
                        w='full'
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Checkbox {...register(`items.${index}.status`)}>{field.name}</Checkbox>

                        <HStack>
                          <Input
                            {...register(`items.${index}.amount`)}
                            w={20}
                            type={'number'}
                            p={2}
                            textAlign={'center'}
                          />
                          <DeleteIcon onClick={() => remove(index)} color={'red.400'} />
                        </HStack>

                        <Input
                          type={'hidden'}
                          {...register(`items.${index}.id`)}
                          value={field.id}
                        />
                      </Flex>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </VStack>
          )}
        </Droppable>
      </DragDropContext>
      <Spacer h={5} />
      <Flex justify='center'>
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
});

export default CategoryId;
