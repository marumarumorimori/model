import React, { useEffect, useRef } from "react";
import styles from "./style.scss";

interface Props {
  title: string;
  content: string;
  onClose: () => void;
}

const Common: React.FunctionComponent<Props> = (props) => {
  const backgroundRef = useRef<HTMLDivElement>(null);

  const handleClose = (e: any) => {
    if (!backgroundRef.current) return;

    if (backgroundRef.current.id === e.target.id) {
      props.onClose();
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClose);

    return () => window.removeEventListener("click", handleClose);
  });

  return (
    <div
      id="modal-background"
      className={styles.background}
      ref={backgroundRef}
    >
      <div className={styles.modal}>
        <div className={styles.top}>
          <div className={styles.title}>{props.title}</div>
          <div className={styles.content}>{props.content}</div>
        </div>
        <div className={styles.children}>{props.children}</div>
      </div>
    </div>
  );
};

export default Common;
