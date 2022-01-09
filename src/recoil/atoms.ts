import { atom } from 'recoil';
import { RECOIL_KEYS } from './constants';

export const authUserAtom = atom({
  key: RECOIL_KEYS.AUTH_USER,
  default: {},
});
