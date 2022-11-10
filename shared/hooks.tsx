import useSWR from "swr";

export const usePokemons = () => {
  const { data, error } = useSWR(
    "https://pokeapi.co/api/v2/pokemon?limit=40",
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
    error,
  };
};
