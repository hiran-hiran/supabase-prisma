import { Button, Input } from '@chakra-ui/react';
import { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { supabase } from '../lib/supabaseClient';

type FormData = {
  email: string;
  password: string;
};

const Signup: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit(async (data) => {
    const { user, session, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });
  });

  return (
    <form onSubmit={onSubmit}>
      <Input {...register('email')} placeholder='メールアドレス' type='email' required />
      <Input {...register('password')} placeholder='パスワード' type='password' required />
      <Button type='submit' colorScheme='teal'>
        サインアップ
      </Button>
    </form>
  );
};

export default Signup;
