import { ChevronDownIcon } from '@chakra-ui/icons';
import { Box, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { supabase } from '../../lib/supabaseClient';
import { authUserAtom } from '../../recoil/atoms';

export const Header = () => {
  const user = useRecoilValue(authUserAtom);
  // console.log({ user });

  return (
    <Box as='header' p={4} display='flex' justifyContent='space-between' borderBottom='1px'>
      <Link href='/'>HOME</Link>
      <Menu id='menu123' isLazy>
        <MenuButton>
          Menu <ChevronDownIcon />
        </MenuButton>
        <MenuList color='gray.800'>
          <MenuItem as='p'>{user.name}</MenuItem>
          <MenuItem as='button' onClick={() => supabase.auth.signOut()} w='full'>
            ログアウト
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};
