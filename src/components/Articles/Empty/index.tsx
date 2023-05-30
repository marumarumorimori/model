import React from "react";
import styles from "./style.scss";

interface Props {
  searched: boolean;
}

const Empty: React.FunctionComponent<Props> = (props) => {
  return props.searched ? (
    <div className={styles.component}>該当する記事は見つかりませんでした</div>
  ) : (
    <div className={styles.component}>投稿された記事は一件もありません</div>
  );
};

export default Empty;
