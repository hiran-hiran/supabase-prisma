import { ChevronDownIcon } from '@chakra-ui/icons';
import { Box, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import { supabase } from '../../lib/supabaseClient';
import { authUserAtom } from '../../recoil/atoms';

export const Header = () => {
  const user = useRecoilValue(authUserAtom);

  return (
    <Box as='header' p={4} display='flex' justifyContent='flex-end' borderBottom='1px'>
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
