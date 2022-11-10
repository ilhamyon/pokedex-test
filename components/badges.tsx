import { css } from "@emotion/react";
import { cardBackground } from "../shared/helpers";
import { PokemonType } from "../shared/interfaces";

interface BadgesProps {
  data: PokemonType[];
}

const styles = {
  chipStyles: css`
    border-radius: 10px;
    color: #fff;
    margin-right: 5px;
    padding: 4px 8px;
  `,
  chipWrapperStyles: css`
    display: flex;
    margin-top: 5px;
  `,
};

const Badges = ({ data }: BadgesProps) => {
  const badges = data?.map(({ type }: any) => {
    return (
      <div
        key={type.name}
        css={[
          styles.chipStyles,
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
  });
  return <div css={styles.chipWrapperStyles}>{badges}</div>;
};

export default Badges;