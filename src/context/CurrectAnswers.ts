import React from "react";

import { ICurrectAnswer } from "@interfaces/ICurrectAnswer";

interface ICurrectAnswers {
  currectAnswers: ICurrectAnswer[];
  showAnswers: boolean;
}

export const CurrectAnswerContext = React.createContext({} as ICurrectAnswers);
