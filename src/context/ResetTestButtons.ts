import React from "react";

interface IResetTestButtons {
  reset: boolean;
}

export const ResetTestButtonsContext = React.createContext(
  {} as IResetTestButtons,
);
