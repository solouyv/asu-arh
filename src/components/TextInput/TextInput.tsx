import React, { ChangeEvent, ChangeEventHandler, useState } from "react";

import styles from "./textinput.module.scss";

interface Props {
  placeholder: string;
  onTextChange: (e: ChangeEvent<HTMLInputElement>) => void;
  autoComplete: boolean;
}

function TextInput({
  placeholder = "Введите данные",
  onTextChange,
  autoComplete = false,
}: Props) {
  return (
    <input
      autoComplete={autoComplete.toString()}
      className={styles.input}
      type="text"
      placeholder={placeholder}
      defaultValue={""}
      onChange={onTextChange}
    />
  );
}

export default TextInput;
