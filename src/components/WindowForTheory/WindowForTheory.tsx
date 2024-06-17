import { ReactElement, useContext } from "react";

import Button from "@components/Button/Button";
import { ThemeContext } from "@context/ThemeContext";
import classNames from "classnames";

import { IProps } from "./IProps";
import styles from "./WindowForTheory.module.scss";

function WindowForTheory({ text, hideFunc }: IProps): ReactElement {
  const { theme } = useContext(ThemeContext);

  function handleClick() {
    hideFunc();
  }

  return (
    <div className={styles.outer_container}>
      <div className={classNames(styles.inner_container, styles[theme])}>
        <textarea className={styles.text} readOnly autoFocus>
          {text}
        </textarea>
        <div className={styles.button}>
          <Button text="Закрыть" onClickFunction={handleClick} />
        </div>
      </div>
    </div>
  );
}

export default WindowForTheory;
