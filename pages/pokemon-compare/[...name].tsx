import { useRouter } from "next/router";
import Link from "next/link";
import Images from "next/image";
import { usePokemonDetail } from "../../shared/hooks";
import { stylesUtil } from "../../shared/helpers";
import { css } from "@emotion/react";
import Badges from "../../components/badges";
import CompareState from "../../components/compare-state";
import CompareBasic from "../../components/compare-basic";

const styles = {
  containerStyles: css`
    margin: 30px auto;
    max-width: 576px;
  `,
  imagesWrapperStyles: css`
    display: flex;
    justify-content: space-evenly;
  `,
  contentImageStyles: css`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
  `,
  titleStyles: css`
    text-transform: capitalize;
  `,
};

const PokemonCompare = () => {
  const router = useRouter();
  const { query } = router;
  const firstPokemon = query.name ? query.name[0] : "";
  const secondPokemon = query.name ? query.name[1] : "";
  const { data: firstPokemonData, error: firstPokemonError } =
    usePokemonDetail(firstPokemon);
  const { data: secondPokemonData, error: secondPokemonError } =
    usePokemonDetail(secondPokemon);

  if (!firstPokemonData || !secondPokemonData) {
    return <div>Loading...</div>;
  }

  return (
    <div css={styles.containerStyles}>
      <Link href="/">
        <a data-test-id="chevron">
          <span css={stylesUtil.chevronStyles}></span>
        </a>
      </Link>
      <div css={styles.imagesWrapperStyles}>
        <div css={styles.contentImageStyles}>
          <Images
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${firstPokemonData?.id}.png`}
            alt="test"
            width="200px"
            height="200px"
            loading="lazy"
          />
          <h1 css={styles.titleStyles}>{firstPokemonData.name}</h1>
          {firstPokemonData?.types ? (
            <Badges data={firstPokemonData?.types} />
          ) : null}
        </div>
        <div css={styles.contentImageStyles}>
          <Images
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${secondPokemonData?.id}.png`}
            alt="test"
            width="200px"
            height="200px"
            loading="lazy"
          />
          <h1 css={styles.titleStyles}>{secondPokemonData.name}</h1>
          {secondPokemonData?.types ? (
            <Badges data={secondPokemonData?.types} />
          ) : null}
        </div>
      </div>
      <CompareBasic
        height={[firstPokemonData?.height, secondPokemonData?.height]}
        weight={[firstPokemonData?.weight, secondPokemonData?.weight]}
      />
      <CompareState
        firstStats={firstPokemonData?.stats}
        secondStats={secondPokemonData?.stats}
      />
    </div>
  );
};

export default PokemonCompare;