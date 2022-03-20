import { VFC } from 'react';
import { Text } from '@chakra-ui/react';

type Props = {
  title: string;
};

export const CategoryTitle: VFC<Props> = ({ title }) => {
  if (!title) {
    return null;
  }

  return (
    <Text fontSize={'2xl'} fontWeight={'bold'} textAlign={'center'}>
      {title}
    </Text>
  );
};
