import React from "react";

interface IContext {
  numberOfBlock: number;
  valuesOfBlock: string[][];
}

const RAMValues = React.createContext({} as IContext);

export { RAMValues };
