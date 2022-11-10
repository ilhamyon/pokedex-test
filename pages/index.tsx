import { css } from "@emotion/react";
import type { NextPage } from "next";
// import InfiniteScroll from "react-infinite-scroller";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactEventHandler, useEffect, useState } from "react";
import Header from "../components/header";
import Layout from "../components/layout";
import PokemonCard from "../components/pokemon-card";
import { Skeleton } from "../lib/styles";
import { usePokemonFiterByGeneration,
  usePokemonFiterByGenerationAndType,
  usePokemonFiterByType,
  usePokemons, } from "../shared/hooks";
import { PokemonDetail } from "../shared/interfaces";

const styles = {
  pokemonContainer: css`
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 24px;
    position: relative;
  `,
  headingStyles: css`
    margin-top: 64px;
  `,
  buttonFilterStyles: css`
    background-color: #fff;
    border: 2px solid pink;
    border-radius: 50%;
    bottom: 10px;
    cursor: pointer;
    height: 60px;
    position: fixed;
    width: 60px;
    z-index: 9;
  `,
  modalCompareStyles: css`
    align-items: center;
    background-color: #fff;
    border-radius: 8px;
    bottom: 10px;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: row;
    position: fixed;
    left: 50%;
    padding: 24px;
    transform: translate(-50%, -50%);
    width: 400px;
    z-index: 99;
  `,
  contentTextStyles: css`
    font-size: 16px;
    text-transform: capitalize;
    margin-right: 12px;
  `,
  btnCompareStyles: css`
    background-color: rgb(49, 130, 206);
    border: none;
    border-radius: 20px;
    color: #fff;
    cursor: pointer;
    font-size: 14px;
    margin-left: auto;
    padding: 5px 10px;
  `,
};

const isLoadingContainer = () => {
  return Array.from({ length: 20 }).map((u, i) => <Skeleton key={i} />);
};

const Home: NextPage = () => {
  const [pokemons, setPokemon] = useState<PokemonDetail[] | undefined>();
  const [isCompare, setIsCompare] = useState<boolean>(false);
  const [compareValue, setCompareValue] = useState<string[]>([]);
  const { dataFilter, errorFilter } = usePokemonFiterByType();
  const { dataFilterGeneration, errorFilterGeneration } =
    usePokemonFiterByGeneration();
  const { dataFilterGenerationType, errorFilterGenerationType } =
    usePokemonFiterByGenerationAndType();
  const { data, setLimit, error } = usePokemons();
  const router = useRouter();
  const { query } = router;

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
  
    setPokemon(undefined);
    if (query.type && query.generation) {
      setPokemon(dataFilterGenerationType);
    } else if (query.type) {
      setPokemon(dataFilter);
    } else if (query.generation) {
      setPokemon(dataFilterGeneration);
    } else {
      setPokemon(data);
    }
  }, [
    query.type,
    query.generation,
    setLimit,
    dataFilter,
    dataFilterGeneration,
    data,
    setPokemon,
    dataFilterGenerationType,
  ]);

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompareValue((prevState) => {
      if (e.target.checked) {
        return [...prevState, e.target.value];
      }
      return prevState.filter((item) => item !== e.target.value);
    });
  };

  const linkCompare = () => {
    let storage = "";
    for (const link of compareValue.slice(0, 2)) {
      storage += `${link}/`;
    }
    router.push(`/pokemon-compare/${storage}`);
  };

  return (
    <>
      <Header setIsCompare={setIsCompare} />
      <Layout>
        <div>
          <h1 css={styles.headingStyles}>Pokedex ( {pokemons?.length} )</h1>
          {compareValue.length > 0 ? (
            <div css={styles.modalCompareStyles}>
              {compareValue.map((item, i) => {
                return (
                  <div css={styles.contentTextStyles} key={i}>
                    {item}
                  </div>
                );
              })}
              <button css={styles.btnCompareStyles} onClick={linkCompare}>
                compare
              </button>
            </div>
          ) : null}
          <div css={styles.pokemonContainer}>
            {!pokemons
              ? isLoadingContainer()
              : pokemons?.map((pokemon: PokemonDetail) => {
                  return (
                    <PokemonCard
                      key={pokemon.name}
                      data={pokemon}
                      isCompare={isCompare}
                      onChangeValue={onChangeValue}
                    />
                  );
                })}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
