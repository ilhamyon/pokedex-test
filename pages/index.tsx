import { css } from "@emotion/react";
import type { NextPage } from "next";
// import InfiniteScroll from "react-infinite-scroller";
import { useEffect } from "react";
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

const headingStyles = css`
  margin-top: 24px;
`;

const isLoadingContainer = () => {
  return Array.from({ length: 20 }).map((u, i) => <Skeleton key={i} />);
};

const Home: NextPage = () => {
  const { data, setLimit, error } = usePokemons();

  useEffect(() => {
    window.onscroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        setLimit((prevState) => {
          return prevState + 10;
        });
      }
    };
  });

  return (
    <Layout>
      <div>
        <h1 css={headingStyles}>Pokedex ( {data?.length} )</h1>
        <div css={pokemonContainer}>
          {!data
            ? isLoadingContainer()
            : data?.map((pokemon: PokemonDetail) => {
                return <PokemonCard key={pokemon.name} data={pokemon} />;
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
