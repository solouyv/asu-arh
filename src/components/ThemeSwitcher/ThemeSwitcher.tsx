import { ReactElement, useContext } from "react";

import { ThemeContext } from "@context/ThemeContext";
import { Theme } from "@enums/Theme";
import { MdDarkMode, MdLightMode } from "react-icons/md";

import styles from "./switcher.module.scss";

function ThemeSwitcher(): ReactElement {
  const { theme, setTheme } = useContext(ThemeContext);

  function changeTheme() {
    if (theme === Theme.Light) {
      setTheme(Theme.Dark);
    } else {
      setTheme(Theme.Light);
    }
  }

  return (
    <>
      {theme === Theme.Light ? (
        <MdLightMode className={styles.theme_button} onClick={changeTheme} />
      ) : (
        <MdDarkMode className={styles.theme_button} onClick={changeTheme} />
      )}
    </>
  );
}

export default ThemeSwitcher;
