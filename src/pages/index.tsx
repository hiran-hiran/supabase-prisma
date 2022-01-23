import type { NextPage } from 'next';
import { Button, Flex, Grid, GridItem, useDisclosure, Text, Box } from '@chakra-ui/react';
import { useRecoilRefresher_UNSTABLE, useRecoilStateLoadable } from 'recoil';
import Link from 'next/link';
import { CategoryModal } from '../components/shared/modal';
import { Category } from '@prisma/client';
import { categoryState } from '../recoil/category';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { axiosClient } from '../lib/axios';

const Home: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [categories, _] = useRecoilStateLoadable(categoryState);
  const refresh = useRecoilRefresher_UNSTABLE(categoryState);

  const handleDeleteCategory = async (categoryId) => {
    const res = await axiosClient.delete('/api/category', {
      params: {
        categoryId,
      },
    });

    if (res.status === 200) {
      refresh();
    }
  };

  if (!categories || categories.state === 'loading') {
    return <Text>Loading</Text>;
  }

  if (categories.state === 'hasError') {
    return <Text>Error</Text>;
  }

  return (
    <>
      <Grid templateColumns='repeat(2, 1fr)' gap={4}>
        {categories.contents.map((category: Category) => (
          <Box key={category.id} position={'relative'}>
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<HamburgerIcon color='gray.800' />}
                position={'absolute'}
                right={2}
                top={2}
                p={0}
                m={0}
                minW={'auto'}
                h={'auto'}
                bg={'transparent'}
                _hover={{ background: 'transparent' }}
              />
              <MenuList color={'gray.800'}>
                <MenuItem onClick={() => handleDeleteCategory(category.id)}>削除</MenuItem>
              </MenuList>
            </Menu>
            <Link href={`/category/${category.id}`} passHref>
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
          </Box>
        ))}
      </Grid>
      <Flex mt={5}>
        <Button mx='auto' color='gray.800' onClick={onOpen}>
          追加
        </Button>
        <CategoryModal isOpen={isOpen} onClose={onClose} refresh={refresh} />
      </Flex>
    </>
  );
};

export default Home;
