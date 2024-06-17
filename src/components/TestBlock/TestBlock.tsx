import { ReactElement, useContext } from "react";

import CheckBox from "@components/CheckBox/CheckBox";
import RadioButton from "@components/RadioButton/RadioButton";
import { ThemeContext } from "@context/ThemeContext";
import classNames from "classnames";

import { IProps } from "./IProps";
import styles from "./testblock.module.scss";

function TestBlock({
  titleOfQuestion,
  answers,
  IsSeveralAnswers,
}: IProps): ReactElement {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={classNames(styles.container, styles[theme])}>
      <div className={styles.title_of_question}>{titleOfQuestion}</div>
      <div className={styles.answers_container}>
        {answers.map((item) => {
          if (IsSeveralAnswers) {
            return (
              <CheckBox key={item} answer={item} question={titleOfQuestion} />
            );
          } else {
            return (
              <RadioButton
                key={item}
                answer={item}
                question={titleOfQuestion}
              />
            );
          }
        })}
      </div>
    </div>
  );
}

export default TestBlock;
