import { css } from "@emotion/react";
import Images from "next/image";
import Link from "next/link";
import { cardBackground } from "../shared/helpers";
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

const pokemonTitleStyles = css`
  margin-bottom: 4px;
  margin-top: 4px;
  text-transform: capitalize;
`;

const PokemonCard = ({ data }: PokemonCardProps) => {
  console.log(data);
  const pokemonType = data.types[0].type.name;
  const backgroundColor =
    cardBackground[pokemonType as keyof typeof cardBackground];

  return (
    <Link href={`/${data.name}`}>
      <a
        css={css`
          cursor: pointer;
          display: contents;
        `}
      >
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
          <h4 css={pokemonTitleStyles}>{data.name}</h4>
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
      </a>
    </Link>
  );
};

export default PokemonCard;
