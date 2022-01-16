import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import { Button, Flex, Grid, GridItem, useDisclosure } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import { authUserAtom } from '../recoil/atoms';
import Link from 'next/link';
import { CategoryModal } from '../components/shared/modal';
import { axiosClient } from '../lib/axios';

const Home: NextPage = () => {
  const [categoies, setCategoies] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const authUser = useRecoilValue(authUserAtom);

  const fetchDate = async () => {
    if (!authUser) {
      return null;
    }

    try {
      const { data } = await axiosClient.get('/api/category', {
        params: {
          authUserId: authUser.id,
        },
      });
      setCategoies(data);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    fetchDate();
  }, [authUser]);

  return (
    <>
      <Grid templateColumns='repeat(3, 1fr)' gap={4}>
        {categoies?.map((category) => (
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
