import { useState, useEffect } from 'react';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  const [list, setList] = useState([]);

  const fetchDate = async () => {
    try {
      const res = await fetch('/api/user');
      const user = await res.json();

      setList(user);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    fetchDate();
  }, []);

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
