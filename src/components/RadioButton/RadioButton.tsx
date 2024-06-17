import { ReactElement, useContext, useEffect, useRef, useState } from "react";

import BlockAnswersContext from "@context/BlockAnswers";
import { CurrectAnswerContext } from "@context/CurrectAnswers";
import { ResetTestButtonsContext } from "@context/ResetTestButtons";
import classNames from "classnames";

import { IProps } from "./IProps";
import styles from "./radio.module.scss";

function RadioButton({ answer, question }: IProps): ReactElement {
  const [selected, setSelected] = useState<boolean>(false);
  const { answers, selectAnswers } = useContext(BlockAnswersContext);
  const radioRef = useRef<HTMLInputElement | null>(null);
  const { reset } = useContext(ResetTestButtonsContext);
  const { showAnswers, currectAnswers } = useContext(CurrectAnswerContext);

  useEffect(() => {
    setAnswer();
  }, [selected]);

  useEffect(() => {
    if (!reset) {
      setSelected(false);
      (radioRef.current as HTMLInputElement).checked = false;
      (radioRef.current as HTMLInputElement).disabled = false;
    }
  }, [reset]);

  useEffect(() => {
    findThisAnswer();
  }, [answers]);

  useEffect(() => {
    if (showAnswers) {
      (radioRef.current as HTMLInputElement).disabled = true;
    }
  }, [showAnswers]);

  function findThisAnswer() {
    const arr = [...answers];

    for (let i = 0; i < arr.length; i++) {
      if (arr[i].question === question) {
        if (
          arr[i].selectedAnswers.filter((item) => item === answer).length === 0
        ) {
          setSelected(false);
          break;
        }
      }
    }
  }

  function isCurrectAnswer(): string {
    for (let i = 0; i < currectAnswers.length; i++) {
      if (currectAnswers[i].titleOfQuestion === question) {
        if (
          currectAnswers[i].currectAnswers.indexOf(answer) !== -1 &&
          (selected || !selected)
        ) {
          return styles.currect;
        } else if (
          currectAnswers[i].currectAnswers.indexOf(answer) === -1 &&
          selected
        ) {
          return styles.uncurrect;
        }
      }
    }

    return "";
  }

  function handleSelect() {
    setSelected(true);
  }

  function setAnswer() {
    if (selected) {
      selectAnswers(question, answer);
    }
  }

  return (
    <div
      className={classNames(
        styles.container,
        showAnswers ? isCurrectAnswer() : "",
      )}
    >
      <input
        ref={radioRef}
        type="radio"
        value={answer}
        onChange={handleSelect}
        name={question}
      />
      <label>{answer}</label>
    </div>
  );
}
export default RadioButton;
