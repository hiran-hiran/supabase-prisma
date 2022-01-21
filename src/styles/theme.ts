import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'gray.800',
        color: 'white',
        fontSize: '15px',
      },
    },
  },
  components: {
    Checkbox: {
      baseStyle: {
        container: {
          _checked: {
            color: 'gray',
            textDecoration: 'line-through',
          },
        },
        control: {
          borderRadius: '3px',
          w: '22px',
          h: '22px',
          _checked: {
            bg: 'gray',
          },
        },
      },
      defaultProps: {
        size: 'lg',
      },
    },
  },
});
