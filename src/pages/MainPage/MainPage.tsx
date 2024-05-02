import { ReactElement } from "react";

import { Link } from "react-router-dom";

import Card from "../../components/LaboratoryCard/LaboratoryCard";
import styles from "./mainpage.module.scss";

function MainPage(): ReactElement {
  return (
    <div className={styles.container}>
      <Link to={"binary-sum"} className={styles.link}>
        <Card title="Лабораторная работа № 1" />
      </Link>
      <Card title="Лабораторная работа № 2" />
      <Card title="Лабораторная работа № 3" />
      <Card title="Лабораторная работа № 4" />
      <Card title="Лабораторная работа № 5" />
      <Card title="Лабораторная работа № 6" />
    </div>
  );
}

export default MainPage;
