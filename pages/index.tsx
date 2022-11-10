import { css } from "@emotion/react";
import type { NextPage } from "next";
// import InfiniteScroll from "react-infinite-scroller";
import Layout from "../components/layout";
import PokemonCard from "../components/pokemon-card";
import { Skeleton } from "../lib/styles";
import { usePokemons } from "../shared/hooks";
import { PokemonDetail } from "../shared/interfaces";

const pokemonContainer = css`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 24px;
`;

const Home: NextPage = () => {
  const { data, error } = usePokemons();
  return (
    <Layout>
      <div>
        <h1>Pokedex ( {data?.length} )</h1>
        <div css={pokemonContainer}>
          {!data ? (
            <Skeleton />
          ) : (
            data?.map((pokemon: PokemonDetail) => {
              return <PokemonCard key={pokemon.name} data={pokemon} />;
            })
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
