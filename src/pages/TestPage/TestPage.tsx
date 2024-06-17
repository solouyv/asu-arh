import {
  ReactElement,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

import Button from "@components/Button/Button";
import TestBlock from "@components/TestBlock/TestBlock";
import TestThemeIsNotFound from "@components/TestThemeIsNotFound/TestThemeIsNotFound";
import BlockAnswersContext from "@context/BlockAnswers";
import { CurrectAnswerContext } from "@context/CurrectAnswers";
import { ResetTestButtonsContext } from "@context/ResetTestButtons";
import { ThemeContext } from "@context/ThemeContext";
import { IAnswer } from "@interfaces/IAnswer";
import { ICurrectAnswer } from "@interfaces/ICurrectAnswer";
import { IQuestion } from "@interfaces/IQuestion";
import {
  arithmeticOperationsTest,
  cacheTest as cacheLink,
  compareNumbersTest,
  dynamicRAMTest,
  ramTest as ramLink,
} from "@router/Links";
import { getRandomNumber } from "@scripts/scripts";
import classNames from "classnames";
import { useParams } from "react-router";

import {
  arithTest,
  cacheTest,
  compareTest,
  dramTest,
  ramTest,
} from "./Questions";
import styles from "./testspage.module.scss";

function TestPage(): ReactElement {
  const [answers, setAnswers] = useState<IAnswer[]>([]);
  const params = useParams();
  const [showResult, setShowResult] = useState<boolean>(false);
  const [quantityOfCurrectAnswers, setQuantityOfCurrectAnswers] =
    useState<number>(0);
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [quantityOfQuestions] = useState<number>(10);
  const [isThemeNotFound, setIsThemeNotFound] = useState<boolean>(false);
  const { theme } = useContext(ThemeContext);
  const [currectAnswers, setCurrectAnswers] = useState<ICurrectAnswer[]>([]);

  useLayoutEffect(() => {
    defineTestTheme();
  }, []);

  useEffect(() => {
    if (showResult) {
      getResultOfTest();
    }
  }, [showResult]);

  function defineTestTheme() {
    const themeTest: string | undefined = params.theme;

    if (themeTest) {
      if (themeTest === ramLink.path) {
        randomiseQuestions(ramTest);
      } else if (themeTest === cacheLink.path) {
        randomiseQuestions(cacheTest);
      } else if (themeTest === arithmeticOperationsTest.path) {
        randomiseQuestions(arithTest);
      } else if (themeTest === dynamicRAMTest.path) {
        randomiseQuestions(dramTest);
      } else if (themeTest === compareNumbersTest.path) {
        randomiseQuestions(compareTest);
      } else {
        setIsThemeNotFound(true);
      }
    } else {
      setIsThemeNotFound(true);
    }
  }

  function randomiseQuestions(questions: IQuestion[]) {
    let arr = [...questions];
    const currectAnswers: ICurrectAnswer[] = [];
    const result: IQuestion[] = [];

    while (result.length !== quantityOfQuestions) {
      if (arr.length === 0) {
        break;
      }
      const index: number = getRandomNumber(0, arr.length - 1);

      if (arr[index] === undefined) {
        break;
      }

      result.push(arr[index]);
      currectAnswers.push({
        currectAnswers: arr[index].currectAnswer,
        titleOfQuestion: arr[index].title,
      });

      arr = arr.filter(
        (item) => item.title !== result[result.length - 1].title,
      );
    }

    setQuestions(result);
    setCurrectAnswers(currectAnswers);
  }

  function repeatTest() {
    defineTestTheme();
    setShowResult(false);
  }

  function getResultOfTest() {
    let quantityOfCurrectAnswers: number = 0;

    for (let i = 0; i < answers.length; i++) {
      const question: string = answers[i].question;
      const listOfAnswers: string[] = answers[i].selectedAnswers;
      let answerIsCurrect: boolean = true;

      for (let j = 0; j < questions.length; j++) {
        let stop: boolean = false;

        if (question === questions[j].title) {
          if (questions[j].currectAnswer.length === listOfAnswers.length) {
            for (let k = 0; k < listOfAnswers.length; k++) {
              if (questions[j].currectAnswer.indexOf(listOfAnswers[k]) === -1) {
                answerIsCurrect = false;
                stop = true;
                break;
              }
            }

            if (stop) {
              break;
            }
          } else {
            answerIsCurrect = false;
            break;
          }
        }
      }

      if (answerIsCurrect) {
        quantityOfCurrectAnswers++;
      }
    }

    setQuantityOfCurrectAnswers(quantityOfCurrectAnswers);
  }

  function defineHowMuchAnswers(question: string): boolean {
    const ques = [...questions];

    for (let i = 0; i < ques.length; i++) {
      if (ques[i].title === question) {
        return ques[i].isSeveralAnswers;
      }
    }

    return false;
  }

  function finishTest() {
    setShowResult(true);
  }

  function handleSetAnswers(question: string, answer: string) {
    const arr = [...answers];
    const severalAnswers: boolean = defineHowMuchAnswers(question);

    if (arr.length === 0) {
      setAnswers([{ question: question, selectedAnswers: [answer] }]);
    } else if (arr.filter((item) => item.question === question).length === 0) {
      arr.push({ question: question, selectedAnswers: [answer] });
      setAnswers(arr);
    } else {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].question === question) {
          if (severalAnswers) {
            arr[i].selectedAnswers = [...arr[i].selectedAnswers, answer];
            break;
          } else {
            arr[i].selectedAnswers = [];
            arr[i].selectedAnswers.push(answer);
            break;
          }
        }
      }

      setAnswers(arr);
    }
  }

  function handleRemoveAnswer(question: string, answer: string) {
    const filtredAnswers = [
      ...answers.map((arr) => {
        if (arr.question === question) {
          return {
            question: question,
            selectedAnswers: arr.selectedAnswers.filter(
              (item) => item !== answer,
            ),
          } as IAnswer;
        } else {
          return arr;
        }
      }),
    ].filter((item) => item.selectedAnswers.length !== 0);

    setAnswers(filtredAnswers);
  }

  return (
    <>
      {isThemeNotFound ? (
        <TestThemeIsNotFound />
      ) : (
        <div className={styles.outer_container}>
          <div className={styles.inner_container}>
            <CurrectAnswerContext.Provider
              value={{
                showAnswers: showResult,
                currectAnswers: currectAnswers,
              }}
            >
              <ResetTestButtonsContext.Provider value={{ reset: showResult }}>
                <BlockAnswersContext.Provider
                  value={{
                    answers: answers,
                    selectAnswers: handleSetAnswers,
                    removeAnswers: handleRemoveAnswer,
                  }}
                >
                  {questions.map((item, index) => {
                    return (
                      <TestBlock
                        key={item.title}
                        numberOfBlock={index}
                        titleOfQuestion={item.title}
                        answers={item.variantsOfAnswer}
                        IsSeveralAnswers={item.isSeveralAnswers}
                      />
                    );
                  })}
                </BlockAnswersContext.Provider>
              </ResetTestButtonsContext.Provider>
            </CurrectAnswerContext.Provider>

            <div className={classNames(styles.result_container, styles[theme])}>
              <div className={styles.result_text}>
                {showResult &&
                  `Вы ответили на ${quantityOfCurrectAnswers}  из ${questions.length}`}
              </div>
              <Button
                text={showResult ? "Повторить тест" : "Закончить тест"}
                onClickFunction={showResult ? repeatTest : finishTest}
                disabled={answers.length !== questions.length}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TestPage;
