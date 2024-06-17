import { ReactElement, useContext } from "react";

import { ThemeContext } from "@context/ThemeContext";
import { Theme } from "@enums/Theme";
import classNames from "classnames";

import CacheUnit from "../CacheUnit/CacheUnit";
import { IProps } from "./IProps";
import styles from "./cache.module.scss";

function Cache({
  values,
  title = "",
  checkingColIndex,
  checkingRowIndex,
  showChecking,
  showAddedValue = false,
  showFoundedValue = false,
  changeValue,
  isCheckingForAlreadyUsedValues,
  isChangeable = true,
}: IProps): ReactElement {
  const { theme } = useContext(ThemeContext);

  function isChecking(rowIndex: number, colIndex: number): boolean {
    return checkingRowIndex === rowIndex && checkingColIndex === colIndex;
  }

  return (
    <table className={styles.cache_table}>
      <caption
        className={classNames(
          styles.header,
          theme === Theme.Light ? styles.light_header : styles.dark_header,
        )}
      >
        {title}
      </caption>
      <tbody>
        {values.map((arr, rowIndex) => {
          return (
            <tr
              className={
                theme === Theme.Light ? styles.light_row : styles.dark_row
              }
              key={rowIndex + 10000}
            >
              {(arr as string[]).map((item, colIndex) => (
                <CacheUnit
                  key={colIndex + 100000}
                  text={item}
                  changeValue={changeValue}
                  isChecking={showChecking && isChecking(rowIndex, colIndex)}
                  rowIndex={rowIndex}
                  colIndex={colIndex}
                  titleOfCache={title}
                  isAddedValue={
                    showAddedValue &&
                    title.includes("L2") &&
                    rowIndex + 1 === values.length
                  }
                  isValueFounded={
                    showFoundedValue &&
                    title.includes("L2") &&
                    checkingRowIndex === rowIndex &&
                    checkingColIndex === colIndex
                  }
                  isCheckingForAlreadyUsedValues={
                    isCheckingForAlreadyUsedValues &&
                    checkingRowIndex === rowIndex &&
                    checkingColIndex === colIndex
                  }
                  isChangeable={isChangeable}
                />
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Cache;
