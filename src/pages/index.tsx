import type { NextPage } from 'next';
import { Button, Flex, Grid, GridItem, useDisclosure, Text } from '@chakra-ui/react';
import { useRecoilValueLoadable } from 'recoil';
import Link from 'next/link';
import { CategoryModal } from '../components/shared/modal';
import { Category } from '@prisma/client';
import { categoryState } from '../recoil/category';

const Home: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const data = useRecoilValueLoadable(categoryState);

  if (!data || data.state === 'loading') {
    return <Text>Loading</Text>;
  }

  if (data.state === 'hasError') {
    return <Text>Error</Text>;
  }

  return (
    <>
      <Grid templateColumns='repeat(2, 1fr)' gap={4}>
        {data.contents.map((category: Category) => (
          <Link href={`/category/${category.id}`} key={category.id} passHref>
            <GridItem
              as='a'
              h={20}
              display='flex'
              alignItems='center'
              justifyContent='center'
              bg='white'
              borderRadius='lg'
              color={'gray.800'}
            >
              {category.title}
            </GridItem>
          </Link>
        ))}
      </Grid>
      <Flex mt={5}>
        <Button mx='auto' color='gray.800' onClick={onOpen}>
          追加
        </Button>
        <CategoryModal isOpen={isOpen} onClose={onClose} />
      </Flex>
    </>
  );
};

export default Home;
