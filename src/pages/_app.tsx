import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../styles/theme';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';
import { useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import { Layout } from '../components/shared/layout';

function MyApp({ Component, pageProps }: AppProps) {
  const { push } = useRouter();
  const session = supabase.auth.session();
  // const authUser = supabase.auth.user();

  // console.log({ session, authUser });

  supabase.auth.onAuthStateChange((_event, session) => {
    // console.log('onAuthStateChange', { _event });
    // console.log('onAuthStateChange', { session });
  });

  // console.log('_app', { session });

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
