import { css } from "@emotion/react";
import { stylesUtil } from "../shared/helpers";

const styles = {
  contentWrapperStyles: css`
    display: flex;
    flex-direction: column;
    width: calc(50% - 6px);
  `,
  contentItemStyles: css`
    margin-bottom: 8px;
    width: 100%;
  `,
  contentItemWrapperStyles: css`
    display: flex;
    flex-direction: row;
  `,
  titleItemStyle: css`
    margin-bottom: 8px;
    text-align: center;
  `,
  numTwoStyles: css`
    text-align: right;
  `,
  itemsContainerStyles: css`
    display: flex;
    justify-content: space-between;
  `,
  statNameStyles: css`
    opacity: 0;
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
  visibleStatStyles: css`
    text-transform: capitalize;
  `,
  statusRightStyles: css`
    right: 0;
  `,
};

const CompareState = (data: any) => {
  return (
    <div css={stylesUtil.compareCard}>
      <h4 css={stylesUtil.titleStyles}>Stats</h4>
      <div css={styles.itemsContainerStyles}>
        <div css={styles.contentWrapperStyles}>
          {data?.firstStats?.map((stat: any, i: number) => {
            return (
              <div key={i} css={styles.contentItemStyles}>
                <p css={styles.visibleStatStyles}>{stat.stat.name}</p>
                <p>{stat.base_stat}</p>
                <div css={styles.statusbarStyles}>
                  <div
                    css={styles.statusBarBlueStyles}
                    style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
        <div css={styles.contentWrapperStyles}>
          {data?.secondStats?.map((stat: any, i: number) => {
            return (
              <div key={i} css={styles.contentItemStyles}>
                <p css={[styles.numTwoStyles, styles.statNameStyles]}>
                  {stat.stat.name}
                </p>
                <p css={styles.numTwoStyles}>{stat.base_stat}</p>
                <div css={styles.statusbarStyles}>
                  <div
                    css={[styles.statusBarBlueStyles, styles.statusRightStyles]}
                    style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CompareState;