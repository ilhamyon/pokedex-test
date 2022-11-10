import { css } from "@emotion/react";
import Images from "next/image";
import { PokemonDetail } from "../shared/interfaces";

interface PokemonCardProps {
  data: PokemonDetail;
}

const cardStyles = css`
  border-radius: 1.25rem;
  height: 100%;
  min-height: 246px;
  padding: 12px;
  width: calc(50% - 6px);
`;

const imageWrapperStyles = css`
  margin-bottom: 12px;
  text-align: center;
`;

const chipWrapperStyles = css`
  display: flex;
`;

const chipStyles = css`
  border-radius: 8px;
  color: #fff;
  font-size: 12px;
  margin-right: 3px;
  padding: 4px 8px;
`;

const cardBackground = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

const PokemonCard = ({ data }: PokemonCardProps) => {
  console.log(data);
  const pokemonType = data.types[0].type.name;
  const backgroundColor =
    cardBackground[pokemonType as keyof typeof cardBackground];

  return (
    <article
      css={[
        cardStyles,
        css`
          background-color: ${backgroundColor}80;
        `,
      ]}
    >
      <div css={imageWrapperStyles}>
        <Images
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`}
          alt="test"
          width="162px"
          height="162px"
          loading="lazy"
        />
      </div>
      <p>#{data.id}</p>
      <h4>{data.name}</h4>
      <div css={chipWrapperStyles}>
        {data.types.map(({ type }) => {
          return (
            <div
              key={type.name}
              css={[
                chipStyles,
                css`
                  background-color: ${cardBackground[
                    type.name as keyof typeof cardBackground
                  ]};
                `,
              ]}
            >
              {type.name}
            </div>
          );
        })}
      </div>
    </article>
  );
};

export default PokemonCard;
