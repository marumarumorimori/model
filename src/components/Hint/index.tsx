import React from "react";
import styles from "./style.scss";
import HintImage from "@/assets/images/icon/btn_hint.png";
import HintRootImage from "@/assets/images/icon/ic_hint_root.png";

interface Props {
  text: string;
}

const Hint: React.FunctionComponent<Props> = (props) => {
  return (
    <div className={styles.component}>
      <img src={HintImage} alt="hint" className={styles.hint} />
      <div className={styles.message}>{props.text}</div>
      <img src={HintRootImage} className={styles.root} alt="hint-root" />
    </div>
  );
};

export default Hint;
