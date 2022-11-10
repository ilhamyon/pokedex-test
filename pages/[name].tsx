import { useRouter } from "next/router";
import Link from "next/link";
import Images from "next/image";
import { css } from "@emotion/react";
import { usePokemonDetail } from "../shared/hooks";
import Layout from "../components/layout";
import { cardBackground, stylesUtil } from "../shared/helpers";
import { useState } from "react";
import Badges from "../components/badges";

const styles = {
  pokemonTitleStyles: css`
    text-transform: capitalize;
  `,
  tabWrapperStyles: css`
    background-color: #fff;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
  `,
  tabContainerStyles: css`
    display: flex;
  `,
  tabStyles: css`
    cursor: pointer;
    border: none;
    background-color: transparent;
    font-size: 20px;
    font-weight: 700;
    opacity: 0.6;
    padding: 20px 0;
    width: 50%;
    &:hover {
      opacity: 1;
    }
  `,
  tabActiveStyles: css`
    border-bottom: 2px solid #60a5fa;
    opacity: 1;
  `,
  contentWrapperStyles: css`
    padding: 20px;
  `,
  contentDetailStyles: css`
    display: flex;
    margin-bottom: 15px;
  `,
  contentAttrStyles: css`
    color: rgb(113, 128, 150);
    font-size: 20px;
    min-width: 100px;
  `,
  contentValueStyles: css`
    font-size: 20px;
  `,
  contentTopStyles: css`
    padding-left: 20px;
    padding-top: 20px;
    padding-right: 20px;
  `,
  imageWrapperStyles: css`
    margin-bottom: 12px;
    margin-top: 12px;
    text-align: center;
  `,
  stateItemStyles: css`
    display: flex;
  `,
  baseStatContainerStyles: css`
    margin-top: 20px;
    padding: 0 15px;
  `,
  statNumStyles: css`
    margin-left: auto;
  `,
  textCapitalize: css`
    text-transform: uppercase;
  `,
  stateItemWrapperStyles: css`
    margin-bottom: 10px;
  `,
  statusbarStyles: css`
    background-color: #cbd5e0;
    border-radius: 8px;
    height: 8px;
    margin-top: 5px;
    overflow: hidden;
    position: relative;
    width: 100%;
  `,
  statusBarBlueStyles: css`
    background-color: #3182ce;
    border-radius: 8px;
    bottom: 0;
    left: 0;
    position: absolute;
    top: 0;
  `,
};

const PokemonName = () => {
  const [tabActive, setTabActive] = useState<number>(0);
  const router = useRouter();
  const { name } = router.query;
  const { data, error } = usePokemonDetail(name as string);

  const pokemonType = data?.types[0].type.name;
  const backgroundColor =
    cardBackground[pokemonType as keyof typeof cardBackground];

  const abilities = data?.abilities.map(({ ability }: any) => ability.name);
  const abilitiesStr = abilities?.join(", ");

  if (!data) {
    return (
      <Layout>
        <p>Loading...</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div
        data-test-id="pokemon-name"
        css={css`
          background-color: ${backgroundColor}80;
        `}
      >
        <div>
          <div css={styles.contentTopStyles}>
            <Link href="/">
              <a data-test-id="chevron">
                <span css={stylesUtil.chevronStyles}></span>
              </a>
            </Link>
            <h1>#{data?.id}</h1>
            <h1 css={styles.pokemonTitleStyles} data-test-id="name">
              {data?.name}
            </h1>
            {data?.types ? <Badges data={data?.types} /> : null}
            <div css={styles.imageWrapperStyles}>
              <Images
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data?.id}.png`}
                alt="test"
                width="345px"
                height="345px"
                loading="lazy"
              />
            </div>
          </div>
          <div css={styles.tabWrapperStyles}>
            <div css={styles.tabContainerStyles}>
              <button
                css={[
                  styles.tabStyles,
                  tabActive === 0 ? styles.tabActiveStyles : null,
                ]}
                onClick={() => setTabActive(0)}
              >
                About
              </button>
              <button
                css={[
                  styles.tabStyles,
                  tabActive === 1 ? styles.tabActiveStyles : null,
                ]}
                onClick={() => setTabActive(1)}
              >
                Base Stats
              </button>
            </div>
            <div>
              {tabActive === 0 ? (
                <div css={styles.contentWrapperStyles}>
                  <div css={styles.contentDetailStyles}>
                    <p css={styles.contentAttrStyles}>Height: </p>
                    <p css={styles.contentValueStyles}>{data?.height}</p>
                  </div>
                  <div css={styles.contentDetailStyles}>
                    <p css={styles.contentAttrStyles}>Weight: </p>
                    <p css={styles.contentValueStyles}>{data?.weight}</p>
                  </div>
                  <div css={styles.contentDetailStyles}>
                    <p css={styles.contentAttrStyles}>Abilities: </p>
                    <p css={styles.contentValueStyles}>{abilitiesStr}</p>
                  </div>
                </div>
              ) : (
                <div css={styles.baseStatContainerStyles}>
                  {data?.stats.map((stat: any) => (
                    <div
                      key={stat.stat.name}
                      css={styles.stateItemWrapperStyles}
                    >
                      <div css={styles.stateItemStyles}>
                        <div
                          css={[
                            styles.contentAttrStyles,
                            styles.textCapitalize,
                          ]}
                        >
                          {stat.stat.name}
                        </div>
                        <div
                          css={[
                            styles.statNumStyles,
                            styles.contentValueStyles,
                          ]}
                        >
                          {stat.base_stat}
                        </div>
                      </div>
                      <div css={styles.statusbarStyles}>
                        <div
                          css={styles.statusBarBlueStyles}
                          style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PokemonName;