import React from "react";
import styles from "./style.scss";
import Button from "@/components/Button/Text";
import { useHistory } from "react-router";

const NotFound: React.FunctionComponent = () => {
  const history = useHistory();

  return (
    <div className={styles.component}>
      <div className={styles.title}>404</div>
      <div className={styles.text}>
        お探しのページは見つかりませんでした
        <br />
        一時的にアクセスできない状態か
        <br />
        移動もしくは削除されてしまった可能性があります
      </div>
      <div className={styles.buttonContainer}>
        <Button onClick={() => history.push("/")}>記事一覧に戻る</Button>
      </div>
    </div>
  );
};

export default NotFound;
