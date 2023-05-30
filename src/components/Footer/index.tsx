import React from "react";
import styles from "./style.scss";
import Button from "@/components/Button/Text";

const Footer: React.FunctionComponent = () => {
  return (
    <footer className={styles.component}>
      <div>
        <Button type="Trash" onClick={() => console.log("delete")}>
          削除
        </Button>
      </div>
      <div className={styles.publish}>
        <div className={styles.state}>状態：公開中</div>
        <Button type="mini" onClick={() => console.log("private")}>
          非公開
        </Button>
      </div>
    </footer>
  );
};

export default Footer;
