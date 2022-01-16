import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import { Button, Flex, Grid, GridItem, useDisclosure } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import Link from 'next/link';
import { axiosClient } from '../../lib/axios';

const Home: NextPage = () => {
  const [categoies, setCategoies] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const authUser = useRecoilValue(authUserAtom);

  // const fetchDate = async () => {
  //   if (!authUser) {
  //     return null;
  //   }

  //   try {
  //     const { data } = await axiosClient.get('/api/category', {
  //       params: {
  //         authUserId: authUser.id,
  //       },
  //     });
  //     setCategoies(data);
  //   } catch (error) {
  //     console.log('error', error);
  //   }
  // };

  // useEffect(() => {
  //   fetchDate();
  // }, [authUser]);

  return <Flex>Category</Flex>;
};

export default Home;
