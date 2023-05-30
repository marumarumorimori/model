import React from "react";
import styles from "./style.scss";

interface Props {
  text: string;
}

const Breadcrumbs: React.FunctionComponent<Props> = (props) => {
  return <div className={styles.component}>{props.text}</div>;
};

export default Breadcrumbs;
