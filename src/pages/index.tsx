import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { supabase } from "../lib/supabaseClient";

type List = {
  id: string;
  created_at: string;
  name: string;
};

const Home: NextPage = () => {
  const [list, setList] = useState<List[]>([]);

  const fetchDate = async () => {
    try {
      const { data, error } = await supabase.from<List>("test").select("*");

      if (error) {
        throw error;
      }

      if (data) {
        setList(data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchDate();
  }, []);

  console.log(list);

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
