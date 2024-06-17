import { ReactElement, useContext } from "react";

import { ThemeContext } from "@context/ThemeContext";
import classNames from "classnames";

import styles from "./container.module.scss";

function TestThemeIsNotFound(): ReactElement {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={classNames(styles.container, styles[theme])}>
      Тема теста не найдена. Проверьте URL адрес или сообщите преподавателю об
      ошибке
    </div>
  );
}

export default TestThemeIsNotFound;
