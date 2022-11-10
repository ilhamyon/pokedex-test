import { css } from "@emotion/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { usePokemonGenerations, usePokemonTypes } from "../shared/hooks";
import { PokemonType } from "../shared/interfaces";

interface ModalFilterProps {
  setModalState: () => void;
}

const styles = {
  modalFilterStyles: css`
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    height: 430px;
    left: 50%;
    padding: 20px;
    position: fixed;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    z-index: 10;
  `,
  backdropStyles: css`
    background-color: rgba(0, 0, 0, 0.5);
    height: 100%;
    left: 0;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 9;
  `,
  buttonChipStyles: css`
    background-color: transparent;
    border: 2px solid rgb(203, 213, 224);
    border-radius: 20px;
    cursor: pointer;
    font-size: 14px;
    line-height: 21px;
    margin-bottom: 5px;
    margin-right: 5px;
    padding: 3px 16px;
  `,
  textUppercase: css`
    text-transform: uppercase;
  `,
  textFilterStyles: css`
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 10px;
  `,
  typeWrapperStyles: css`
    margin-bottom: 17px;
  `,
  btnSaveStyles: css`
    background-color: rgb(49, 130, 206);
    border: none;
    border-radius: 20px;
    color: #fff;
    cursor: pointer;
    font-size: 20px;
    padding: 10px;
  `,
  btnActiveStyles: css`
    border: 2px solid rgb(49, 130, 206);
  `,
};

const ModalFilter = ({ setModalState }: ModalFilterProps) => {
  const { data, error } = usePokemonTypes();
  const { dataGenerations, errorGenerations } = usePokemonGenerations();
  const router = useRouter();
  const { query } = router;
  const [typeParam, setTypeParam] = useState<string | undefined>("");
  const [genParam, setGenParam] = useState<string | undefined>("");

  useEffect(() => {
    const type = query.type as string;
    setTypeParam(type);
    const generation = query.generation as string;
    setGenParam(generation);
  }, [query.type, query.generation]);

  if (!data || !dataGenerations) {
    return <div>Loading...</div>;
  }

  const generationName = (generation: string) => {
    const splitted = generation.split("-");
    return splitted[1];
  };

  const onTypeClick = (type: string) => {
    setTypeParam((prev) => (prev === type ? "" : type));
  };

  const onGenerationClick = (gen: string) => {
    setGenParam((prev) => (prev === gen ? "" : gen));
  };

  const onSaveClick = () => {
    setModalState();
    router.query.type = typeParam;
    router.query.generation = genParam;
    router.push(
      {
        pathname: "/",
        query: { ...router.query },
      },
      undefined,
      {}
    );
  };

  return (
    <>
      <div css={styles.backdropStyles} onClick={setModalState}></div>
      <div css={styles.modalFilterStyles}>
        <div css={styles.typeWrapperStyles}>
          <h5 css={styles.textFilterStyles}>Types</h5>
          {data.results.map((type: PokemonType) => {
            return (
              <button
                css={[
                  styles.buttonChipStyles,
                  typeParam === type.name && styles.btnActiveStyles,
                ]}
                key={type.name}
                onClick={() => onTypeClick(type.name)}
              >
                {type.name}
              </button>
            );
          })}
        </div>
        <div css={styles.typeWrapperStyles}>
          <h5 css={styles.textFilterStyles}>Generations</h5>
          {dataGenerations.results.map((type: PokemonType) => {
            return (
              <button
                css={[
                  styles.buttonChipStyles,
                  styles.textUppercase,
                  genParam === type.name && styles.btnActiveStyles,
                ]}
                key={type.name}
                onClick={() => onGenerationClick(type.name)}
              >
                {generationName(type.name)}
              </button>
            );
          })}
        </div>
        <button onClick={onSaveClick} css={styles.btnSaveStyles}>
          Save
        </button>
      </div>
    </>
  );
};

export default ModalFilter;