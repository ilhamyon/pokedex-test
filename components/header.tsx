import { css } from "@emotion/react";
import { useState } from "react";
import ModalFilter from "./modal-filter";

const styles = {
  buttonFilterStyles: css`
    background-color: transparent;
    border: none;
    cursor: pointer;
    z-index: 9;
    svg {
      stroke-width: 2px;
    }
  `,

  headerStyles: css`
    background-color: #fff;
    display: flex;
    height: 40px;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 9;
  `,

  headerContentStyles: css`
    display: flex;
    padding: 0 16px;
    margin: 0 auto;
    max-width: 576px;
    width: 100%;
  `,

  headerCompareStyles: css`
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 20px;
    font-weight: 700;
  `,

  buttonWrapperStyles: css`
    display: flex;
    margin-left: auto;
  `,
};

const Header = (data: any) => {
  const [modalState, setModalState] = useState<boolean>(false);
  const onBtnFilterClick = () => {
    setModalState(!modalState);
  };

  const onCompareClick = () => {
    data.setIsCompare((prevState: boolean) => !prevState);
  };

  return (
    <>
      <header css={styles.headerStyles}>
        <div css={styles.headerContentStyles}>
          <div css={styles.buttonWrapperStyles}>
            <button css={styles.headerCompareStyles} onClick={onCompareClick}>
              Compare
            </button>
            <button css={styles.buttonFilterStyles} onClick={onBtnFilterClick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                aria-hidden="true"
              >
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
              </svg>
            </button>
          </div>
        </div>
      </header>
      {modalState ? <ModalFilter setModalState={onBtnFilterClick} /> : null}
    </>
  );
};

export default Header;