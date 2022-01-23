import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState, VFC } from 'react';
import { useRecoilState } from 'recoil';
import { axiosClient } from '../../lib/axios';
import { supabase } from '../../lib/supabaseClient';
import { authUserAtom } from '../../recoil/atoms';
import { Header } from './header';

type Props = {
  children: JSX.Element;
};

type UserData = {
  name: string;
  email: string;
  id: string;
};

export const Layout: VFC<Props> = ({ children }) => {
  const [userData, setUserData] = useState({} as UserData);
  const { pathname } = useRouter();

  const authUser = supabase.auth.user();
  const [_, setAuthUser] = useRecoilState(authUserAtom);

  const fetchDate = async () => {
    if (!authUser) {
      return null;
    }

    try {
      const { data } = await axiosClient.get('/api/user', {
        params: {
          id: authUser.id,
        },
      });

      setUserData(data);
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
