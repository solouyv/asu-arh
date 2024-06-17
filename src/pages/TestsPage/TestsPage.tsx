import { ReactElement } from "react";

import Card from "@components/Card/Card";
import { testLinks } from "@router/Links";
import { Link } from "react-router-dom";

import styles from "./testspage.module.scss";

function TestsPage(): ReactElement {
  return (
    <div className={styles.container}>
      {testLinks.map((link) => {
        return (
          <Link
            key={link.path}
            className={styles.link}
            to={"/test/" + link.path}
          >
            <Card title={link.title} />
          </Link>
        );
      })}
    </div>
  );
}

export default TestsPage;
