import { ReactElement, useContext } from "react";

import logo from "@assets/bru-logo.png";
import ThemeSwitcher from "@components/ThemeSwitcher/ThemeSwitcher";
import { ThemeContext } from "@context/ThemeContext";
import useMatchMedia from "@hooks/useMatchMedia";
import classNames from "classnames";
import { Link } from "react-router-dom";

import styles from "./header.module.scss";

function Header(): ReactElement {
  const { theme } = useContext(ThemeContext);
  const { isUnder324px, isSmallMobile, isMobile, isTablet } = useMatchMedia();

  function isTabletOrLess(): boolean {
    return isUnder324px || isSmallMobile || isMobile || isTablet;
  }

  return (
    <header className={classNames(styles.container, styles[theme])}>
      <div
        className={classNames(styles.wrapper, isTabletOrLess() && styles.col_2)}
      >
        <Link to="/" draggable={false}>
          <img src={logo} alt="logo" />
        </Link>
      </div>
      {isTabletOrLess() && (
        <div className={classNames(styles.wrapper)}>
          <ThemeSwitcher />
        </div>
      )}
      <div
        className={classNames(
          styles.wrapper,
          isTabletOrLess() && styles.grid_col_span,
        )}
      >
        <h1>Виртуальная лаборатория "Архитектура ЭВМ"</h1>
      </div>
      {!isTabletOrLess() && (
        <div className={styles.wrapper}>
          <ThemeSwitcher />
        </div>
      )}
    </header>
  );
}

export default Header;
