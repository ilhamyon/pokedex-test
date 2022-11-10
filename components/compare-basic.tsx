import { css } from "@emotion/react";
import { stylesUtil } from "../shared/helpers";

interface CompareBasicProps {
  height: number[];
  weight: number[];
}

const styles = {
  contentWrapperStyles: css`
    display: flex;
    margin-bottom: 8px;
    width: 100%;
  `,
  contentAttrStyles: css`
    color: rgb(113, 128, 150);
    font-size: 20px;
    min-width: 100px;
  `,
  contentValueStyles: css`
    font-size: 20px;
    margin-left: 48px;
    width: 50%;
  `,
};

const CompareBasic = ({ height, weight }: CompareBasicProps) => {
  return (
    <div css={stylesUtil.compareCard}>
      <h4 css={stylesUtil.titleStyles}>Basic</h4>
      <div>
        <div css={styles.contentWrapperStyles}>
          <p css={styles.contentAttrStyles}>Height: </p>
          <p css={styles.contentValueStyles}>{height[0]}m</p>
          <p css={styles.contentValueStyles}>{height[1]}m</p>
        </div>
        <div css={styles.contentWrapperStyles}>
          <p css={styles.contentAttrStyles}>Weight:</p>
          <p css={styles.contentValueStyles}>{weight[0]}kg</p>
          <p css={styles.contentValueStyles}>{weight[1]}kg</p>
        </div>
      </div>
    </div>
  );
};

export default CompareBasic;