import { ReactElement } from "react";

import { ButtonSizes } from "@enums/ButtonSizes";
import classNames from "classnames";

import IProps from "./IProps";
import styles from "./button.module.scss";

function Button({
  text,
  onClickFunction,
  rounded = false,
  id = "",
  disabled = false,
  size = ButtonSizes.Medium,
  circle = false,
}: IProps): ReactElement {
  function handleClick() {
    onClickFunction();
  }

  return (
    <button
      id={id}
      disabled={disabled}
      className={classNames(
        styles.button,
        rounded ? styles.rounded : null,
        styles[size],
        circle ? styles.circle : null,
      )}
      onClick={handleClick}
    >
      {text}
    </button>
  );
}

export default Button;
