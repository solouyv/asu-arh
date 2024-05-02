import React, { ReactElement, useState } from "react";

import ToolTip from "./ToolTip/ToolTip";
import styles from "./card.module.scss";

interface Props {
  title: string;
}

function Card({ title = "" }: Props): ReactElement {
  const [showToolTip, setShowTooltip] = useState<boolean>(false);

  function switchShow() {
    setShowTooltip((prev) => !prev);
  }

  return (
    <div
      className={styles.container}
      onMouseEnter={switchShow}
      onMouseLeave={switchShow}
    >
      <ToolTip isVisible={showToolTip} />
      <h2>{title}</h2>
    </div>
  );
}

export default Card;
