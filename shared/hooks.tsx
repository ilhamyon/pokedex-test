import { useState } from "react";
import useSWR from "swr";

export const usePokemons = () => {
  const [limit, setLimit] = useState<number>(20);
  const { data, error } = useSWR(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}`,
    (apiURL: string) =>
      fetch(apiURL)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          const results = data.results;
          const fetchAllData = results.map((result: any) => {
            return fetch(result.url).then((response) => response.json());
          });
          return Promise.all(fetchAllData);
        })
        .then((data) => {
          return data;
        })
  );

  return {
    data,
    setLimit,
    error,
  };
};

export const usePokemonDetail = (name: string) => {
  const { data, error } = useSWR(
    `https://pokeapi.co/api/v2/pokemon/${name}`,
    (apiURL: string) => fetch(apiURL).then((res) => res.json())
  );

  return {
    data,
    error,
  } as const;
};
