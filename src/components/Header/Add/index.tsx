import React from "react";
import styles from "./style.scss";
import { useHistory } from "react-router";
import Button from "@/components/Button/Text";
import Sort from "@/components/Sort";
import Search from "@/components/SearchBar";

interface SortItem {
  text: string;
  value: string;
  onClick: () => void;
}

interface Props {
  title: string;
  onSearch: (value: string) => void;
  sortList: SortItem[];
}

const Add: React.FunctionComponent<Props> = (props) => {
  const history = useHistory();

  return (
    <div className={styles.component}>
      <div className={styles.top}>
        <div className={styles.title}>{props.title}</div>
        <div>
          <Button type="mini" onClick={() => history.push("/admins/new")}>
            管理者追加
          </Button>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.sort}>
          <Sort items={props.sortList} />
        </div>
        <Search
          onSearch={props.onSearch}
          placeholder="キーワード入力"
          className={styles.search}
        />
      </div>
    </div>
  );
};

export default Add;
