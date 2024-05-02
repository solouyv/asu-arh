import { ReactElement } from "react";

import styles from "./card.module.scss";

interface Props {
  title: string;
}

function LaboratoryCard({ title = "" }: Props): ReactElement {
  return (
    <div className={styles.container}>
      <h2>{title}</h2>
    </div>
  );
}

export default LaboratoryCard;
