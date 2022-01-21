import { selector } from 'recoil';
import { axiosClient } from '../../lib/axios';
import { authUserAtom } from '../atoms';

export const categoryState = selector({
  key: 'categoryState',
  async get({ get }) {
    const authUser = get(authUserAtom);
    const { data } = await axiosClient.get('/api/category', {
      params: {
        authUserId: authUser.id,
      },
    });

    return data;
  },
  set: (data) => {
    console.log({ data });
  },
});
