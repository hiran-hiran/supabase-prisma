import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState, VFC } from 'react';
import { useRecoilState } from 'recoil';
import { supabase } from '../../lib/supabaseClient';
import { authUserAtom } from '../../recoil/atoms';
import { Header } from './header';

type Props = {
  children: JSX.Element;
};

export const Layout: VFC<Props> = ({ children }) => {
  const [userData, setUserData] = useState([]);
  const { pathname } = useRouter();

  const authUser = supabase.auth.user();
  const [_, setAuthUser] = useRecoilState(authUserAtom);

  const fetchDate = async () => {
    if (!authUser) {
      return null;
    }

    try {
      const res = await fetch('/api/user', {
        method: 'POST',
        body: authUser.id,
      });
      const user = await res.json();
      setUserData(user);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    fetchDate();
  }, []);

  useEffect(() => {
    if (authUser) {
      setAuthUser({ ...authUser, ...userData });
    }
  }, [setAuthUser, authUser, userData]);

  return (
    <>
      {pathname !== '/signin' && <Header />}
      <Box p={4}>{children}</Box>
    </>
  );
};
