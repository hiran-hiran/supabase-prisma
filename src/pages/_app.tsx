import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../styles/theme';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';
import { useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import { Layout } from '../components/shared/layout';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';

dayjs.locale('ja');

function MyApp({ Component, pageProps }: AppProps) {
  const { push } = useRouter();
  const session = supabase.auth.session();

  // supabase.auth.onAuthStateChange((_event, session) => {
  // });

  useEffect(() => {
    if (!session?.user) {
      push('/signin');
    }
  }, []);

  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </RecoilRoot>
  );
}

export default MyApp;
