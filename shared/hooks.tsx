import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import { PokemonDetail } from "./interfaces";

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

export const usePokemonTypes = () => {
  const { data, error } = useSWR(
    `https://pokeapi.co/api/v2/type`,
    (apiURL: string) => fetch(apiURL).then((res) => res.json())
  );

  return {
    data,
    error,
  } as const;
};

export const usePokemonGenerations = () => {
  const { data, error } = useSWR(
    `https://pokeapi.co/api/v2/generation`,
    (apiURL: string) => fetch(apiURL).then((res) => res.json())
  );

  return {
    dataGenerations: data,
    errorGenerations: error,
  } as const;
};

export const usePokemonFiterByType = () => {
  const router = useRouter();
  const { query } = router;
  const { data, error } = useSWR(
    query.type ? `https://pokeapi.co/api/v2/type/${query.type}` : null,
    (apiURL: string) =>
      fetch(apiURL)
        .then((res) => res.json())
        .then((data) => {
          const results = data.pokemon;
          const fetchAllData = results.map((result: any) => {
            return fetch(result.pokemon.url).then((response) =>
              response.json()
            );
          });
          return Promise.all(fetchAllData);
        })
        .then((data) => {
          return data;
        })
  );

  return {
    dataFilter: data,
    errorFilter: error,
  };
};

export const usePokemonFiterByGenerationAndType = () => {
  const router = useRouter();
  const { query } = router;
  const { data, error } = useSWR(
    query.generation
      ? `https://pokeapi.co/api/v2/generation/${query.generation}`
      : null,
    (apiURL: string) =>
      fetch(apiURL)
        .then((res) => res.json())
        .then((data) => {
          const results = data.pokemon_species;
          const fetchAllData = results.map((result: any) => {
            const id = result.url.split("/");
            return fetch(`https://pokeapi.co/api/v2/pokemon/${id[6]}/`).then(
              (response) => response.json()
            );
          });
          return Promise.all(fetchAllData);
        })
        .then((data) => {
          if (query.type) {
            return data.filter(
              (item: PokemonDetail) => item.types[0].type.name === query.type
            );
          }
          return data;
        })
  );

  return {
    dataFilterGenerationType: data,
    errorFilterGenerationType: error,
  };
};

export const usePokemonFiterByGeneration = () => {
  const router = useRouter();
  const { query } = router;
  const { data, error } = useSWR(
    query.generation
      ? `https://pokeapi.co/api/v2/generation/${query.generation}`
      : null,
    (apiURL: string) =>
      fetch(apiURL)
        .then((res) => res.json())
        .then((data) => {
          const results = data.pokemon_species;
          const fetchAllData = results.map((result: any) => {
            const id = result.url.split("/");
            return fetch(`https://pokeapi.co/api/v2/pokemon/${id[6]}/`).then(
              (response) => response.json()
            );
          });
          return Promise.all(fetchAllData);
        })
        .then((data) => {
          return data;
        })
  );

  return {
    dataFilterGeneration: data,
    errorFilterGeneration: error,
  };
};