import { ChangeEvent, ReactElement, useContext } from "react";

import { ThemeContext } from "@context/ThemeContext";
import { arithmeticOperations, multiplicationOfNumbers } from "@router/Links";
import classNames from "classnames";
import { useSearchParams } from "react-router-dom";

import Label from "../Label/Label";
import Select from "../Select/Select";
import TextInput from "../TextInput/TextInput";
import { IProps } from "./IProps";
import styles from "./modalwindow.module.scss";

function ModalWindow(props: IProps): ReactElement {
  const { theme } = useContext(ThemeContext);
  const [searchParams] = useSearchParams();
  function handleSubmit() {
    let hasError = false;

    if (!isFinite(props.firstValue as number) || props.firstValue === "") {
      hasError = true;

      (document.getElementById("firstValueError") as HTMLElement).innerText =
        "Данное поле должно быть числом";
    } else {
      if (isMulti()) {
        if (parseFloat(props.firstValue as string) < 0) {
          (
            document.getElementById("firstValueError") as HTMLElement
          ).innerText = "Число должно быть положительным";
          hasError = true;
        } else {
          props.setFirstValue(parseFloat(props.firstValue as string));
        }
      } else {
        props.setFirstValue(parseFloat(props.firstValue as string));
      }
    }

    if (!isFinite(props.secondValue as number) || props.secondValue === "") {
      hasError = true;
      (document.getElementById("secondValueError") as HTMLElement).innerText =
        "Данное поле должно быть числом";
    } else {
      if (isMulti()) {
        if (parseFloat(props.secondValue as string) < 0) {
          (
            document.getElementById("secondValueError") as HTMLElement
          ).innerText = "Число должно быть положительным";
          hasError = true;
        } else {
          props.setSecondValue(parseFloat(props.secondValue as string));
        }
      } else {
        props.setSecondValue(parseFloat(props.secondValue as string));
      }
    }

    if (props.selectedAccuracy == null) {
      hasError = true;
      (document.getElementById("accurancyError") as HTMLElement).innerText =
        "Выберите значение";
    }

    if (!hasError) {
      props.setShowSecondModal();
    }
  }

  function handleSetFirstValue(e: ChangeEvent<HTMLInputElement>): void {
    const span = document.getElementById("firstValueError");
    props.setFirstValue(e.target.value.replace(",", "."));
    if (span && span.textContent) {
      span.innerText = "";
    }
  }

  function handleSetSecondValue(e: ChangeEvent<HTMLInputElement>): void {
    const span = document.getElementById("secondValueError");
    props.setSecondValue(e.target.value.replace(",", "."));
    if (span && span.textContent) {
      span.innerText = "";
    }
  }

  function handleSetAccurancy(e: ChangeEvent<HTMLSelectElement> | null) {
    const span = document.getElementById("accurancyError");
    props.setSelectedAccurancy(e ? e.target.value : null);

    if (span && span.textContent) {
      span.innerText = "";
    }
  }

  function isMulti(): boolean {
    if (searchParams.get("type") === multiplicationOfNumbers.path) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className={styles.back}>
      <div className={classNames(styles.container, styles[theme])}>
        <div>
          <h1>Введите данные</h1>
        </div>
        <div className={styles.container_for_input}>
          <Label title="Первое число" />
          <TextInput
            placeholder={isMulti() ? "Положительное число" : "Первое число"}
            onTextChange={handleSetFirstValue}
            autoComplete={false}
            hasBorder={false}
          />
          <span id="firstValueError"></span>
        </div>
        <div className={styles.container_for_input}>
          <Label title="Второе число" />
          <TextInput
            placeholder={isMulti() ? "Положительное число" : "Второе число"}
            onTextChange={handleSetSecondValue}
            autoComplete={false}
            hasBorder={false}
          />
          <span id="secondValueError"></span>
        </div>
        <div className={styles.container_for_select}>
          <Label title="Выберите точность" />
          <Select
            onSelect={handleSetAccurancy}
            options={props.accurancyOptions}
            resetButton
          />
          <span id="accurancyError"></span>
        </div>
        <div className={styles.send_bttn_container}>
          <button onClick={handleSubmit}>Подтвердить</button>
        </div>
      </div>
    </div>
  );
}

export default ModalWindow;
