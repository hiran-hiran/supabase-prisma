import { Box } from '@chakra-ui/react';
import { useEffect, useState, VFC } from 'react';
import { useRecoilState } from 'recoil';
import { supabase } from '../../lib/supabaseClient';
import { authUserAtom } from '../../recoil/atoms';
import { Header } from './header';

type Props = {
  children: JSX.Element;
};

export const Layout: VFC<Props> = ({ children }) => {
  const [list, setList] = useState([]);

  const authUser = supabase.auth.user();
  const [_, setAuthUser] = useRecoilState(authUserAtom);

  const fetchDate = async () => {
    try {
      const res = await fetch('/api/user', {
        method: 'POST',
        body: authUser.id,
      });
      const user = await res.json();
      setList(user);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    fetchDate();
  }, []);

  useEffect(() => {
    if (authUser) {
      setAuthUser({ ...authUser, ...list });
    }
  }, [setAuthUser, authUser, list]);

  return (
    <>
      <Header />
      <Box p={4}>{children}</Box>
    </>
  );
};
