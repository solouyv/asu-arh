import React, { SetStateAction } from "react";

import { IAnswer } from "@interfaces/IAnswer";

interface IBlockAnswers {
  answers: IAnswer[];
  selectAnswers: (question: string, answer: string) => void;
  removeAnswers: (question: string, answer: string) => void;
}

const BlockAnswersContext = React.createContext({} as IBlockAnswers);

export default BlockAnswersContext;
