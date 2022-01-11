import { User } from '@supabase/supabase-js';
import { atom } from 'recoil';
import { RECOIL_KEYS } from './constants';

type TUser = User & { name: string };

export const authUserAtom = atom({
  key: RECOIL_KEYS.AUTH_USER,
  default: {} as TUser,
});
