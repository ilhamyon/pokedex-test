import { css } from "@emotion/react";

export const cardBackground = {
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

export const stylesUtil = {
  chevronStyles: css`
    margin-bottom: 8px;
    &::before {
      border-style: solid;
      border-width: 0.25em 0.25em 0 0;
      content: "";
      display: inline-block;
      height: 0.45em;
      left: 0.15em;
      position: relative;
      top: 0.15em;
      transform: rotate(-135deg);
      vertical-align: top;
      width: 0.45em;
    }
  `,
  compareCard: css`
    border-radius: 20px;
    box-shadow: 2px 4px 15px 0 rgb(0 0 0 / 25%);
    margin-top: 40px;
    padding: 20px;
  `,
  titleStyles: css`
    font-size: 20px;
    font-weight: 700;
    line-height: 24px;
    margin-bottom: 20px;
  `,
};