import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import { Button } from '@chakra-ui/react';
import { supabase } from '../lib/supabaseClient';

const Home: NextPage = () => {
  const [list, setList] = useState([]);

  return (
    <div>
      <ul>
        {list.map((el, index) => (
          <li key={index}>{el.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
