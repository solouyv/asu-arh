import { ReactElement, useContext } from "react";

import { ThemeContext } from "@context/ThemeContext";
import { Theme } from "@enums/Theme";
import classNames from "classnames";

import { IProps } from "./IProps";
import styles from "./gridrow.module.scss";

function GridRowContainer({
  sectionId = "",
  sectionTitle = "",
  idOfFirstField = "",
  idOfSecondField = "",
  firstValue = "",
  secondValue = "",
}: IProps): ReactElement {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      id={sectionId}
      className={classNames(
        styles.row_container,
        theme === Theme.Light
          ? styles.light_row_container
          : styles.dark_row_container,
      )}
    >
      <div className={styles.row_three_col}>
        <div className={styles.step_title}>{sectionTitle}</div>
        <div id={idOfFirstField}>{firstValue}</div>
        <div id={idOfSecondField}>{secondValue}</div>
      </div>
    </div>
  );
}

export default GridRowContainer;
