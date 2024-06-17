import React, { SetStateAction } from "react";

import { Theme } from "@enums/Theme";

interface ITheme {
  theme: string | Theme;
  setTheme: (e: SetStateAction<string | Theme>) => void;
}

const ThemeContext = React.createContext({} as ITheme);

export { ThemeContext };
