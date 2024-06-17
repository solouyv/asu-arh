import { ReactElement, useContext } from "react";

import { ThemeContext } from "@context/ThemeContext";
import classNames from "classnames";

import { IProps } from "./IProps";
import styles from "./tableRow.module.scss";

function TableRow({ children }: IProps): ReactElement {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={classNames(styles.row, styles[theme])}>{children}</div>
  );
}

export default TableRow;
