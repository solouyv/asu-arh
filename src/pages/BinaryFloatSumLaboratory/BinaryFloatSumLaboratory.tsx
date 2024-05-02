import {
  MutableRefObject,
  ReactElement,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

import Button from "../../components/Button/Button";
import ModalWindow from "../../components/ModalWindow/ModalWindow";
import { ButtonSizes } from "../../enums/ButtonSizes";
import { IAccurancyOption } from "../../interfaces/IAccurancyOption";
import styles from "./page.module.scss";
import { theory } from "./theory";

function BinaryFloatSumLaboratory(): ReactElement {
  const timer1 = useRef<number>();
  const timer2 = useRef<number>();
  const timerOfSum = useRef<number>();
  const [isFirstTimerEnd, setIsFirstTimerEnd] = useState<boolean>(false);
  const [isSecondTimerEnd, setIsSecondTimerEnd] = useState<boolean>(false);
  const [isTimerOfSumEnd, setIsTimerOfSumEnd] = useState<boolean>(false);
  const [delay] = useState<number>(500);
  const [amountInBinSystem, setAmountInBinSystem] = useState<string>("");
  const [wholePartOfAmount, setWholePartOfAmount] = useState<string>("");
  const [floatPartOfAmount, setFloatPartOfAmount] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(true);
  const [text, setText] = useState<string>("");
  const [step, setStep] = useState<number>(0);
  const [firstValue, setFirstValue] = useState<number | string | null>(null);
  const [secondValue, setSecondValue] = useState<number | string | null>(null);
  const [binFirstValue, setBinFirstValue] = useState<string>("");
  const [binSecondValue, setBinSecondValue] = useState<string>("");
  const [amountInDecSystem, setAmountInDecSystem] = useState<number>(0);
  const [machineFirstValue, setMachineFirstValue] = useState<string>("");
  const [machineSecondValue, setMachineSecondValue] = useState<string>("");
  const [selectedAccuracy, setSelectedAccuracy] = useState<string | null>(null);
  const [accuracyOptions] = useState<IAccurancyOption[]>([
    {
      title: 1,
      value: 1,
    },
    {
      title: 2,
      value: 2,
    },
    {
      title: 3,
      value: 3,
    },
    {
      title: 4,
      value: 4,
    },
    {
      title: 5,
      value: 5,
    },
  ]);
  const [inputFieldsId] = useState({
    wholePartFirst: "wholePartFirst",
    wholePartFirstToBin: "wholePartFirstToBin",
    wholePartSecond: "wholePartSecond",
    wholePartSecondToBin: "wholePartSecondToBin",
    floatPartFirst: "floatPartFirst",
    floatPartFirstToBin: "floatPartFirstToBin",
    floatPartSecond: "floatPartSecond",
    floatPartSecondToBin: "floatPartSecondToBin",
    machineFirstValue: "machineFirstValue",
    machineSecondValue: "machineSecondValue",
    mantissaFirstValue: "mantissaFirstValue",
    mantissaSecondValue: "mantissaSecondValue",
    currentDigitFirstValue: "currentDigitFirstValue",
    currentDigitSecondValue: "currentDigitSecondValue",
    sum: "sum",
    formulaOfWholePart: "formulaOfWholePart",
    convertedToDecWholePart: "convertedToDecWholePart",
    formulaOfFloatPart: "formulaOfFloatPart",
    convertedToDecFloatPart: "convertedToDecFloatPart",
  });
  const [sectionsId] = useState({
    wholePartSection: "wholePartSection",
    floatPartSection: "floatPartSection",
    numberToBinSection: "numberToBinSection",
    toMachineRepresSection: "toMachineRepresSection",
    equalizingMantissaSection: "equalizingMantissaSection",
    additionSection: "additionSection",
    fromMachineToBinSection: "fromMachineToBinSection",
    convertWholePartOfAmountSection: "convertWholePartOfAmountSection",
    convertFloatPartOfAmountSection: "convertFloatPartOfAmountSection",
    resultSection: "resultSection",
  });
  const [isAutomate, setIsAutomate] = useState<boolean>(false);

  useEffect(() => {
    if (!showModal) {
      hideAllSections();
    }
  }, [showModal]);

  useEffect(() => {
    if (isFirstTimerEnd && isSecondTimerEnd) {
      enableNextStepBttnAndIncreaseStep();
      setIsFirstTimerEnd((prev) => !prev);
      setIsSecondTimerEnd((prev) => !prev);
    }
  }, [isFirstTimerEnd, isSecondTimerEnd]);

  useEffect(() => {
    if (isAutomate) {
      if (theory.length !== step) {
        setTimeout(() => startAll(), delay);
      } else {
        setAutomate();
      }
    }
  }, [step]);

  useEffect(() => {
    if (isAutomate) {
      startAll();
    }
  }, [isAutomate]);

  useEffect(() => {
    if (isTimerOfSumEnd) {
      setIsTimerOfSumEnd((prev) => !prev);
      enableNextStepBttnAndIncreaseStep();
    }
  }, [isTimerOfSumEnd]);

  function handleSetShowSecondModal() {
    setShowModal(false);
  }

  function resetAll() {
    resetStates();
    resetTextInHTMLElements();
    hideAllSections();
  }

  function setAutomate() {
    setIsAutomate((prev) => !prev);
  }

  function reenterTheData() {
    resetAll();
    resetEnteredData();
    setShowModal((prev) => !prev);
  }

  function resetEnteredData() {
    setFirstValue("");
    setSecondValue("");
    setSelectedAccuracy("");
  }

  function resetStates() {
    setBinFirstValue("");
    setBinSecondValue("");
    setAmountInBinSystem("");
    setAmountInDecSystem(0);
    setMachineFirstValue("");
    setMachineSecondValue("");
    setStep(0);
    setText("");
    setWholePartOfAmount("");
    setFloatPartOfAmount("");
  }

  function resetTextInHTMLElements() {
    for (let key in inputFieldsId) {
      insertTextToElement("", key);
    }
  }

  function showWholePart(wholePart: number, bin: string, id: string) {
    (document.getElementById(id) as HTMLElement).innerText =
      wholePart.toString();
    (document.getElementById(id + "ToBin") as HTMLElement).innerText = bin;
  }

  function showFloatPart(floatPart: number, bin: string, id: string) {
    (document.getElementById(id) as HTMLElement).innerText =
      floatPart.toString();
    (document.getElementById(id + "ToBin") as HTMLElement).innerText = bin;
  }

  function insertTextToElement(value: string, id: string) {
    let field = document.getElementById(id);

    if (field) {
      field.innerHTML = value;
    }
  }

  function paintNumber(id: string, color: string) {
    let field = document.getElementById(id);

    if (field) {
      field.style.color = color;
    }
  }

  function addingNumbers(
    idOfDigitOfFirstValue: string,
    idOfDigitOfSecondValue: string,
    sumId: string,
    firstValue: string,
    secondValue: string,
    colorizeFunc: (id: string, color: string) => void,
    displayFunc: (value: string, id: string) => void,
    setValue: (e: SetStateAction<string>) => void,
    timerRef: MutableRefObject<number | undefined>,
    isTimerEnd: (e: SetStateAction<boolean>) => void,
  ) {
    let index: number = firstValue.length - 1;
    let digitOfFirstValue: string = firstValue[index];
    let digitOfSecondValue: string = secondValue[index];
    let isOverflowed: boolean = false;
    let sum: string = "";

    colorizeFunc(`${index}digitOfFirstValue`, "red");
    colorizeFunc(`${index}digitOfSecondValue`, "red");
    displayFunc(digitOfFirstValue, idOfDigitOfFirstValue);
    displayFunc(digitOfSecondValue, idOfDigitOfSecondValue);

    timerRef.current = setInterval(() => {
      if (index <= 0) {
        extractWholeAndFloatPartsFromAmountInBin(sum);

        sum = "0." + sum;

        displayFunc(sum, sumId);
        isTimerEnd(true);
        setValue(sum);

        clearInterval(timerRef.current);
      }
      if (digitOfFirstValue === "0" && digitOfSecondValue === "0") {
        if (isOverflowed) {
          sum = "1" + sum;
          isOverflowed = false;
        } else {
          sum = "0" + sum;
        }
      } else if (
        (digitOfFirstValue === "1" && digitOfSecondValue === "0") ||
        (digitOfFirstValue === "0" && digitOfSecondValue === "1")
      ) {
        if (isOverflowed) {
          sum = "0" + sum;
        } else {
          sum = "1" + sum;
        }
      } else if (digitOfFirstValue === "1" && digitOfSecondValue === "1") {
        if (isOverflowed) {
          sum = "1" + sum;
        } else {
          sum = "0" + sum;
        }
        isOverflowed = true;
      }

      displayFunc(sum, sumId);
      colorizeFunc(`${index}digitOfFirstValue`, "black");
      colorizeFunc(`${index}digitOfSecondValue`, "black");

      index--;
      digitOfFirstValue = firstValue[index];
      digitOfSecondValue = secondValue[index];

      if (digitOfFirstValue !== "." && digitOfFirstValue) {
        colorizeFunc(`${index}digitOfFirstValue`, "red");
        colorizeFunc(`${index}digitOfSecondValue`, "red");
        displayFunc(digitOfFirstValue, idOfDigitOfFirstValue);
        displayFunc(digitOfSecondValue, idOfDigitOfSecondValue);
      } else {
        if (isOverflowed) {
          sum = "1" + sum;
          isOverflowed = false;
        }
        index--;
      }
    }, delay);
  }

  function showSection(sectionId: string, displayProperty: string = "grid") {
    (document.getElementById(sectionId) as HTMLElement).style.display =
      displayProperty;
  }

  function enableNextStepBttnAndIncreaseStep() {
    if (!isAutomate) {
      (document.getElementById("nextStepBttn") as HTMLButtonElement).disabled =
        false;
    }
    setStep((prev) => ++prev);
  }

  function convertToBinWholeParts(
    value: number,
    func: (wholePart: number, bin: string, id: string) => void,
    timerRef: MutableRefObject<number | undefined>,
    id: string,
    setValue: (e: SetStateAction<string>) => void,
    setIsTimerEnd: (e: SetStateAction<boolean>) => void,
  ) {
    let bin: number = value % 2;
    value = Math.trunc(value / 2);
    let str: string = bin.toString();

    timerRef.current = setInterval(() => {
      if (value === 0) {
        setValue(str);
        clearInterval(timerRef.current);
        setIsTimerEnd((prev) => !prev);
      }

      func(value, str, id);

      bin = value % 2;
      value = Math.trunc(value / 2);
      str = bin + str;
    }, delay);
  }

  function convertToBinFloatParts(
    floatPart: number,
    func: (floatPart: number, bin: string, id: string) => void,
    timerRef: MutableRefObject<number | undefined>,
    id: string,
    setBinValue: (e: SetStateAction<string>) => void,
    setIsTimerEnd: (e: SetStateAction<boolean>) => void,
  ) {
    let bin: number = 0;
    let str: string = "";
    let step: number = 1;

    timerRef.current = setInterval(() => {
      floatPart *= 2;
      bin = Math.trunc(floatPart);
      str = str + bin.toString();
      floatPart = floatPart - Math.trunc(floatPart);

      func(floatPart, str, id);
      step++;

      if (step > Number(selectedAccuracy) || floatPart === 0) {
        setBinValue((prev) => prev + `.${str}`);
        clearInterval(timerRef.current);
        setIsTimerEnd((prev) => !prev);
      }
    }, delay);
  }

  function convertBinNumberToMachineRepresentation(
    binValue: string,
    func: (bin: string, id: string) => void,
    timerRef: MutableRefObject<number | undefined>,
    id: string,
    setValue: (e: SetStateAction<string>) => void,
    setIsTimerEnd: (e: SetStateAction<boolean>) => void,
  ) {
    let splitBin: string[] = binValue.split(".");
    let floatPart: string = splitBin[1];
    let str: string = splitBin[0];
    let floatLength: number = floatPart.length;
    let index: number = 0;
    let stepAfterEqual: number = 0;
    timerRef.current = setInterval(() => {
      if (index === floatLength) {
        if (stepAfterEqual === 0) {
          str = "." + str;

          func(str, id);
        } else if (stepAfterEqual === 1) {
          str = "0" + str;

          func(str, id);
        } else {
          setValue(str);
          clearInterval(timerRef.current);
          setIsTimerEnd((prev) => !prev);
        }

        stepAfterEqual++;
      } else {
        func(str, id);

        str += floatPart[index];
        index++;
      }
    }, delay);
  }

  function fromMachineToBin(
    value: string,
    idToShow: string,
    timerRef: MutableRefObject<number | undefined>,
    isTimerEnd: (e: SetStateAction<boolean>) => void,
    insertIntoHTMLFunc: (value: string, id: string) => void,
  ) {
    let splitedValue: string[] = value.split(".");
    let valueBeforeDot: string = splitedValue[0];
    let valueAfterDot: string = splitedValue[1];
    let str: string = value;

    timerRef.current = setInterval(() => {
      if (valueAfterDot.length === Number(selectedAccuracy)) {
        isTimerEnd((prev) => !prev);
        clearInterval(timerRef.current);
      }

      insertIntoHTMLFunc(str, idToShow);

      str = valueBeforeDot + valueAfterDot[0] + "." + valueAfterDot.slice(1);

      splitedValue = str.split(".");
      valueBeforeDot = splitedValue[0];
      valueAfterDot = splitedValue[1];
    }, delay);
  }

  function equalizingTheLengthOfMantissa(
    maxLengthOfWholePart: number,
    maxLengthOfFloatPart: number,
    binValue: string,
    value: string,
    func: (value: string, id: string) => void,
    setValue: (e: SetStateAction<string>) => void,
    timerRef: MutableRefObject<number | undefined>,
    isTimerEnd: (e: SetStateAction<boolean>) => void,
    id: string,
  ) {
    let splitedValue: string[] = value.split(".");

    if (
      splitedValue[1].length !==
      maxLengthOfWholePart + maxLengthOfFloatPart
    ) {
      let str: string = value;
      let wholePart: string = binValue.split(".")[0];
      let floatPart: string = binValue.split(".")[1];

      timerRef.current = setInterval(() => {
        if (wholePart.length === maxLengthOfWholePart) {
          if (floatPart.length === maxLengthOfFloatPart) {
            isTimerEnd((prev) => !prev);
            setValue(str);
            clearInterval(timerRef.current);
          } else {
            floatPart = floatPart + "0";
          }
        } else {
          wholePart = "0" + wholePart;
        }

        func(str, id);

        str = "0." + wholePart + floatPart;
      }, delay);
    } else {
      setTimeout(() => {
        func(value, id);
        isTimerEnd((prev) => !prev);
      }, delay);
    }
  }

  function startWholeParts() {
    convertToBinWholeParts(
      Math.trunc(firstValue as number),
      showWholePart,
      timer1,
      inputFieldsId.wholePartFirst,
      setBinFirstValue,
      setIsFirstTimerEnd,
    );
    convertToBinWholeParts(
      Math.trunc(secondValue as number),
      showWholePart,
      timer2,
      inputFieldsId.wholePartSecond,
      setBinSecondValue,
      setIsSecondTimerEnd,
    );
  }

  function startFloatParts() {
    convertToBinFloatParts(
      (firstValue as number) - Math.trunc(firstValue as number),
      showFloatPart,
      timer1,
      inputFieldsId.floatPartFirst,
      setBinFirstValue,
      setIsFirstTimerEnd,
    );
    convertToBinFloatParts(
      (secondValue as number) - Math.trunc(secondValue as number),
      showFloatPart,
      timer2,
      inputFieldsId.floatPartSecond,
      setBinSecondValue,
      setIsSecondTimerEnd,
    );
  }

  function startMachineRepresentation() {
    convertBinNumberToMachineRepresentation(
      binFirstValue,
      insertTextToElement,
      timer1,
      inputFieldsId.machineFirstValue,
      setMachineFirstValue,
      setIsFirstTimerEnd,
    );
    convertBinNumberToMachineRepresentation(
      binSecondValue,
      insertTextToElement,
      timer2,
      inputFieldsId.machineSecondValue,
      setMachineSecondValue,
      setIsSecondTimerEnd,
    );
  }

  function startFromMachineToBin() {
    setIsSecondTimerEnd(true);
    fromMachineToBin(
      amountInBinSystem,
      "fromMachineToBin",
      timer1,
      setIsFirstTimerEnd,
      insertTextToElement,
    );
  }

  function startEqualizingMantissa() {
    if (
      machineFirstValue.length === machineSecondValue.length &&
      binFirstValue.split(".")[1].length === Number(selectedAccuracy) &&
      binSecondValue.split(".")[1].length === Number(selectedAccuracy)
    ) {
      setTimeout(() => {
        insertTextToElement(
          machineFirstValue,
          inputFieldsId.mantissaFirstValue,
        );
        insertTextToElement(
          machineSecondValue,
          inputFieldsId.mantissaSecondValue,
        );
        enableNextStepBttnAndIncreaseStep();
      }, delay);
    } else {
      if (machineFirstValue.length > machineSecondValue.length) {
        equalizingTheLengthOfMantissa(
          binFirstValue.split(".")[0].length,
          Number(selectedAccuracy),
          binFirstValue,
          machineFirstValue,
          insertTextToElement,
          setMachineFirstValue,
          timer1,
          setIsFirstTimerEnd,
          inputFieldsId.mantissaFirstValue,
        );
        equalizingTheLengthOfMantissa(
          binFirstValue.split(".")[0].length,
          Number(selectedAccuracy),
          binSecondValue,
          machineSecondValue,
          insertTextToElement,
          setMachineSecondValue,
          timer2,
          setIsSecondTimerEnd,
          inputFieldsId.mantissaSecondValue,
        );
      } else {
        equalizingTheLengthOfMantissa(
          binSecondValue.split(".")[0].length,
          Number(selectedAccuracy),
          binFirstValue,
          machineFirstValue,
          insertTextToElement,
          setMachineFirstValue,
          timer1,
          setIsFirstTimerEnd,
          inputFieldsId.mantissaFirstValue,
        );
        equalizingTheLengthOfMantissa(
          binSecondValue.split(".")[0].length,
          Number(selectedAccuracy),
          binSecondValue,
          machineSecondValue,
          insertTextToElement,
          setMachineSecondValue,
          timer2,
          setIsSecondTimerEnd,
          inputFieldsId.mantissaSecondValue,
        );
      }
    }
  }

  function startAdding() {
    addingNumbers(
      inputFieldsId.currentDigitFirstValue,
      inputFieldsId.currentDigitSecondValue,
      inputFieldsId.sum,
      machineFirstValue,
      machineSecondValue,
      paintNumber,
      insertTextToElement,
      setAmountInBinSystem,
      timerOfSum,
      setIsTimerOfSumEnd,
    );
  }

  function startAll() {
    if (!isAutomate) {
      (document.getElementById("nextStepBttn") as HTMLButtonElement).disabled =
        true;
    }

    if (step === 0) {
      showSection(sectionsId.wholePartSection);
      startWholeParts();
    } else if (step === 1) {
      showSection(sectionsId.floatPartSection);
      startFloatParts();
    } else if (step === 2) {
      showSection(sectionsId.numberToBinSection);
      enableNextStepBttnAndIncreaseStep();
    } else if (step === 3) {
      showSection(sectionsId.toMachineRepresSection);
      startMachineRepresentation();
    } else if (step === 4) {
      showSection(sectionsId.equalizingMantissaSection);
      startEqualizingMantissa();
    } else if (step === 5) {
      showSection(sectionsId.additionSection);
      startAdding();
    } else if (step === 6) {
      showSection(sectionsId.fromMachineToBinSection);
      startFromMachineToBin();
    } else if (step === 7) {
      showSection(sectionsId.convertWholePartOfAmountSection, "flex");
      setTimeout(
        () =>
          convertToDecWholePart(
            "convertedToDecWholePart",
            "formulaOfWholePart",
          ),
        delay,
      );
    } else if (step === 8) {
      showSection(sectionsId.convertFloatPartOfAmountSection, "flex");
      setTimeout(
        () =>
          convertToDecFloatPart(
            "convertedToDecFloatPart",
            "formulaOfFloatPart",
          ),
        delay,
      );
      setTimeout(() => {
        showSection(sectionsId.resultSection);
        (document.getElementById("innerContainer") as HTMLElement).scrollTo(
          0,
          (document.getElementById("innerContainer") as HTMLElement)
            .scrollHeight,
        );
      }, delay + 1000);
    }
    (document.getElementById("innerContainer") as HTMLElement).scrollTo(
      0,
      (document.getElementById("innerContainer") as HTMLElement).scrollHeight,
    );
    setText(theory[step]);
  }

  function extractWholeAndFloatPartsFromAmountInBin(amount: string) {
    setWholePartOfAmount(
      amount.slice(0, amount.length - Number(selectedAccuracy)),
    );
    setFloatPartOfAmount(
      amount.slice(amount.length - Number(selectedAccuracy)),
    );
  }

  function convertToDecWholePart(resultId: string, formulaId: string) {
    const formula: string = drawingUpAFormula(
      wholePartOfAmount,
      wholePartOfAmount.length - 1,
    );
    setAmountInDecSystem((prev) => prev + parseInt(wholePartOfAmount, 2));
    insertTextToElement(formula, formulaId);
    insertTextToElement(parseInt(wholePartOfAmount, 2).toString(), resultId);
    enableNextStepBttnAndIncreaseStep();
  }

  function convertToDecFloatPart(resultId: string, formulaId: string) {
    const formula: string = drawingUpAFormula(floatPartOfAmount, -1);
    insertTextToElement(formula, formulaId);

    let value: number = 0;
    let degree: number = 1;

    for (let i = 0; i < floatPartOfAmount.length; i++, degree++) {
      value += Math.pow(1 / 2, degree) * Number(floatPartOfAmount[i]);
    }
    setAmountInDecSystem((prev) => prev + value);
    insertTextToElement(value.toString(), resultId);
    enableNextStepBttnAndIncreaseStep();
  }

  function drawingUpAFormula(value: string, degree: number): string {
    let formula: string = "";

    for (let i = 0; i < value.length; i++, degree--) {
      if (i + 1 === value.length) {
        formula += `${value[i]}&times2<sup>${degree}</sup>`;
      } else {
        formula += `${value[i]}&times2<sup>${degree}</sup>+`;
      }
    }

    return formula;
  }

  function hideAllSections() {
    for (let id in sectionsId) {
      (document.getElementById(id) as HTMLElement).style.display = "none";
    }
  }

  if (showModal) {
    return (
      <ModalWindow
        firstValue={firstValue}
        setFirstValue={setFirstValue}
        secondValue={secondValue}
        setSecondValue={setSecondValue}
        accurancyOptions={accuracyOptions}
        selectedAccuracy={selectedAccuracy}
        setSelectedAccurancy={setSelectedAccuracy}
        setShowSecondModal={handleSetShowSecondModal}
      />
    );
  }

  return (
    <div className={styles.outer_container}>
      <div id="innerContainer" className={styles.inner_container}>
        <div className={styles.row_container}>
          <div className={styles.row_three_col}>
            <div>Этап</div>
            <div>
              Первое число: <span>{firstValue}</span>
            </div>
            <div>
              Второе число: <span>{secondValue}</span>
            </div>
          </div>
        </div>
        <div id={sectionsId.wholePartSection} className={styles.row_container}>
          <div className={styles.row_three_col}>
            <div className={styles.step_title}>Преобразование целой части</div>
            <div>
              Целая часть:{" "}
              <span id={inputFieldsId.wholePartFirst}>
                {Math.trunc(firstValue as number)}
              </span>
            </div>
            <div>
              Целая часть:{" "}
              <span id={inputFieldsId.wholePartSecond}>
                {Math.trunc(secondValue as number)}
              </span>
            </div>
          </div>
          <div className={styles.row_three_col}>
            <div className={styles.step_title}>В двоичном виде</div>
            <div id={inputFieldsId.wholePartFirstToBin}></div>
            <div id={inputFieldsId.wholePartSecondToBin}></div>
          </div>
        </div>
        <div id={sectionsId.floatPartSection} className={styles.row_container}>
          <div className={styles.row_three_col}>
            <div className={styles.step_title}>
              Преобразование дробной части
            </div>
            <div>
              Дробная часть:{" "}
              <span id={inputFieldsId.floatPartFirst}>
                {(firstValue as number) - Math.trunc(firstValue as number)}
              </span>
            </div>
            <div>
              Дробная часть:{" "}
              <span id={inputFieldsId.floatPartSecond}>
                {(secondValue as number) - Math.trunc(secondValue as number)}
              </span>
            </div>
          </div>
          <div className={styles.row_container}>
            <div className={styles.row_three_col}>
              <div className={styles.step_title}>В двоичном виде</div>
              <div id={inputFieldsId.floatPartFirstToBin}></div>
              <div id={inputFieldsId.floatPartSecondToBin}></div>
            </div>
          </div>
        </div>
        <div
          id={sectionsId.numberToBinSection}
          className={styles.row_container}
        >
          <div className={styles.row_three_col}>
            <div className={styles.step_title}>Числа в двоичной системе</div>
            <div id="binFirstValue">{binFirstValue}</div>
            <div id="binSecondValue">{binSecondValue}</div>
          </div>
        </div>
        <div
          id={sectionsId.toMachineRepresSection}
          className={styles.row_container}
        >
          <div className={styles.row_three_col}>
            <div className={styles.step_title}>
              Преобразование в машинное представление
            </div>
            <div id={inputFieldsId.machineFirstValue}></div>
            <div id={inputFieldsId.machineSecondValue}></div>
          </div>
        </div>
        <div
          id={sectionsId.equalizingMantissaSection}
          className={styles.row_container}
        >
          <div className={styles.row_three_col}>
            <div className={styles.step_title}>Уравнивание мантиссы</div>
            <div id={inputFieldsId.mantissaFirstValue}></div>
            <div id={inputFieldsId.mantissaSecondValue}></div>
          </div>
        </div>
        <div
          id={sectionsId.additionSection}
          className={styles.addiction_container}
        >
          <div className={styles.row}>
            <div>Сложение чисел</div>
            <div>
              {machineFirstValue.split("").map((value, index) => {
                if (value === ".") {
                  return <span key={index}>{value}</span>;
                } else {
                  return (
                    <span key={index} id={index + "digitOfFirstValue"}>
                      {value}
                    </span>
                  );
                }
              })}
            </div>
            <div>
              {machineSecondValue.split("").map((value, index) => {
                if (value === ".") {
                  return <span key={index}>{value}</span>;
                } else {
                  return (
                    <span key={index} id={index + "digitOfSecondValue"}>
                      {value}
                    </span>
                  );
                }
              })}
            </div>
          </div>
          <div className={styles.row}>
            <div>Текущая цифра</div>
            <div>
              <span id={inputFieldsId.currentDigitFirstValue}></span>
            </div>
            <div>
              <span id={inputFieldsId.currentDigitSecondValue}></span>
            </div>
          </div>
          <div className={styles.row}>
            <div>Результат</div>
            <div className={styles.sum}>
              <span id={inputFieldsId.sum}></span>
            </div>
          </div>
        </div>
        <div
          id={sectionsId.fromMachineToBinSection}
          className={styles.row_container}
        >
          <div className={styles.row_two_col}>
            <div className={styles.step_title}>
              Преобразование числа из машинного представления в двоичную систему
            </div>
            <div id="fromMachineToBin"></div>
          </div>
        </div>
        <div
          id={sectionsId.convertWholePartOfAmountSection}
          className={styles.row_container}
        >
          <div className={styles.row_two_col}>
            <div className={styles.step_title}>
              Преобразование целой части в десятичную систему
            </div>
            <div>Целая часть: {wholePartOfAmount}</div>
          </div>
          <div className={styles.row_two_col}>
            <div className={styles.step_title}>Формула</div>
            <div
              id={inputFieldsId.formulaOfWholePart}
              className={styles.formula}
            ></div>
          </div>
          <div className={styles.row_two_col}>
            <div className={styles.step_title}>Результат</div>
            <div
              id={inputFieldsId.convertedToDecWholePart}
              className={styles.formula}
            ></div>
          </div>
        </div>
        <div
          id={sectionsId.convertFloatPartOfAmountSection}
          className={styles.row_container}
        >
          <div className={styles.row_two_col}>
            <div className={styles.step_title}>
              Преобразование дробной части в десятичную систему
            </div>
            <div>Дробная часть: {floatPartOfAmount}</div>
          </div>
          <div className={styles.row_two_col}>
            <div className={styles.step_title}>Формула</div>
            <div
              id={inputFieldsId.formulaOfFloatPart}
              className={styles.formula}
            ></div>
          </div>
          <div className={styles.row_two_col}>
            <div className={styles.step_title}>Результат</div>
            <div
              id={inputFieldsId.convertedToDecFloatPart}
              className={styles.formula}
            ></div>
          </div>
        </div>
        <div id={sectionsId.resultSection} className={styles.row_container}>
          <div className={styles.resultSection}>
            <p>
              Результатом сложение чисел <b>{firstValue}</b> и{" "}
              <b>{secondValue}</b> с точностью <b>{selectedAccuracy}</b>{" "}
              является число <b>{amountInDecSystem}</b>
            </p>
          </div>
        </div>
      </div>
      <div className={styles.info_container}>
        <div className={styles.text_container}>{text}</div>
        <div className={styles.buttons_container}>
          <Button
            text={theory.length === step ? "Повторить" : "Следующий этап"}
            size={ButtonSizes.Big}
            id="nextStepBttn"
            onClickFunction={theory.length !== step ? startAll : resetAll}
            disabled={isAutomate}
          />
          <Button
            text={
              isAutomate ? "Показывать поэтапно" : "Показывать автоматически"
            }
            size={ButtonSizes.Big}
            onClickFunction={setAutomate}
            disabled={theory.length === step}
          />
          <Button
            text="Ввести данные заново"
            size={ButtonSizes.Big}
            onClickFunction={reenterTheData}
            disabled={isAutomate}
          />
        </div>
      </div>
    </div>
  );
}

export default BinaryFloatSumLaboratory;
