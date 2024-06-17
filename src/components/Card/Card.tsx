import { ReactElement, useContext, useState } from "react";

import { ThemeContext } from "@context/ThemeContext";
import classNames from "classnames";

import { IProps } from "./IProps";
import ToolTip from "./ToolTip/ToolTip";
import styles from "./card.module.scss";

function Card({ title = "", toolTipText = "" }: IProps): ReactElement {
  const [showToolTip, setShowTooltip] = useState<boolean>(false);
  const { theme } = useContext(ThemeContext);

  function switchShow() {
    setShowTooltip((prev) => !prev);
  }

  return (
    <div
      className={classNames(styles.container, styles[theme])}
      onMouseEnter={switchShow}
      onMouseLeave={switchShow}
    >
      {toolTipText && <ToolTip isVisible={showToolTip} text={toolTipText} />}
      <h2>{title}</h2>
    </div>
  );
}

export default Card;
