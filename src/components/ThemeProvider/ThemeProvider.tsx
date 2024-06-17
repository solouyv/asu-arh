import { ReactElement, useEffect, useLayoutEffect, useState } from "react";

import { ThemeContext } from "@context/ThemeContext";
import { Theme } from "@enums/Theme";
import { getTheme } from "@scripts/scripts";

import { IProps } from "./IProps";

function ThemeProvider({ children }: IProps): ReactElement {
  const [theme, setTheme] = useState<Theme | string>("");

  useLayoutEffect(() => {
    setTheme(getTheme());
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);

    document.body.style.backgroundColor =
      theme === Theme.Light ? "white" : "gray";
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme: theme, setTheme: setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
