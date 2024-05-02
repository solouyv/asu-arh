import React, { ReactElement } from "react";

import styles from "./tooltip.module.scss";

interface Props {
  isVisible: boolean;
}

function ToolTip({ isVisible }: Props): ReactElement {
  return (
    <>
      <h2>Сложение чисел</h2>
      <h3>очень много какого-то текста вообще не знаю что сюда писать</h3>
    </>
  );
}

export default ToolTip;
