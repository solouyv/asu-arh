import { ReactElement } from "react";

import styles from "./footer.module.scss";

function Footer(): ReactElement {
  return (
    <footer className={styles.container}>
      <div>
        <h2>Development by Skachinskii Nikita from ASOIZ-191</h2>
      </div>
    </footer>
  );
}

export default Footer;
