import { ReactElement, useContext } from "react";

import { ThemeContext } from "@context/ThemeContext";
import classNames from "classnames";

import { IProps } from "./IProps";
import styles from "./tooltip.module.scss";

function ToolTip({ text = "" }: IProps): ReactElement {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={classNames(styles.container, styles[theme])}>{text}</div>
  );
}

export default ToolTip;
