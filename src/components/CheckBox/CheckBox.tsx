import { ReactElement, useContext, useEffect, useRef, useState } from "react";

import BlockAnswersContext from "@context/BlockAnswers";
import { CurrectAnswerContext } from "@context/CurrectAnswers";
import { ResetTestButtonsContext } from "@context/ResetTestButtons";
import classNames from "classnames";

import { IProps } from "./IProps";
import styles from "./checkbox.module.scss";

function CheckBox({ answer, question }: IProps): ReactElement {
  const [selected, setSelected] = useState<boolean>(false);
  const boxRef = useRef<HTMLInputElement | null>(null);
  const { reset } = useContext(ResetTestButtonsContext);
  const { selectAnswers, removeAnswers } = useContext(BlockAnswersContext);
  const { currectAnswers, showAnswers } = useContext(CurrectAnswerContext);

  useEffect(() => {
    if (!reset) {
      setSelected(false);
      (boxRef.current as HTMLInputElement).checked = false;
      (boxRef.current as HTMLInputElement).disabled = false;
    }
  }, [reset]);

  useEffect(() => {
    setAnswer();
  }, [selected]);

  function handleSelect() {
    setSelected((prev) => !prev);
  }

  function setAnswer() {
    if (selected) {
      selectAnswers(question, answer);
    } else {
      removeAnswers(question, answer);
    }
  }

  useEffect(() => {
    if (showAnswers) {
      (boxRef.current as HTMLInputElement).disabled = true;
    }
  }, [showAnswers]);

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

  return (
    <div
      className={classNames(styles.container, showAnswers && isCurrectAnswer())}
    >
      <input
        type="checkbox"
        ref={boxRef}
        checked={selected}
        value={answer}
        onClick={handleSelect}
        name={question}
      />
      <label>{answer}</label>
    </div>
  );
}

export default CheckBox;
