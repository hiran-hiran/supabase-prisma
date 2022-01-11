import { Button, Input, VStack } from '@chakra-ui/react';
import { NextPage } from 'next';
import Router from 'next/router';
import { useForm } from 'react-hook-form';
import { supabase } from '../lib/supabaseClient';

type Props = {};

type FormData = {
  email: string;
  password: string;
};

const Signin: NextPage<Props> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit(async (data) => {
    const { user, session, error } = await supabase.auth.signIn({
      email: data.email,
      password: data.password,
    });

    if (user) {
      Router.push('/');
    }
  });

  return (
    <VStack as='form' spacing={5} onSubmit={onSubmit}>
      <Input {...register('email')} placeholder='メールアドレス' type='email' required />
      <Input {...register('password')} placeholder='パスワード' type='password' required />
      <Button type='submit' colorScheme='teal'>
        ログイン
      </Button>
    </VStack>
  );
};

export default Signin;
