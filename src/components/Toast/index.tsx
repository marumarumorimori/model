import React from "react";
import styles from "./style.scss";
import { useToast } from "@/hooks/useToast";

const Toast: React.FunctionComponent = () => {
  const { message } = useToast();

  if (!message) return null;

  return (
    <div className={styles.component}>
      <div className={styles.text}>{message}</div>
    </div>
  );
};

export default Toast;
