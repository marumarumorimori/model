import React from "react";
import styles from "./style.scss";
import Sort from "@/components/Sort";
import Search from "@/components/SearchBar";
import { Choice } from "@/components/Segment";
import IconButton from "@/components/Button/Icon";

interface SortItem {
  text: string;
  value: string;
  onClick: () => void;
}

interface Props {
  title: string;
  sortList: SortItem[];
  onSearch: (value: string) => void;
  onChangeSegment?: (value: Choice) => void;
  selectedSegment?: Choice;
  placeholder?: string;
}

const SegmentHeader: React.FunctionComponent<Props> = (props) => {
  const onSearch = (value: string) => {
    props.onSearch(value);
  };

  return (
    <header className={styles.component}>
      <div className={styles.main}>
        <div className={styles.title}>{props.title}</div>
      </div>
      <div className={styles.sub}>
        <div className={styles.left}>
          {props.selectedSegment ? (
            <>
              <div className={styles.segment}>
                <div className={styles.buttonContainer}>
                  <IconButton
                    onClick={() =>
                      props.onChangeSegment && props.onChangeSegment("list")
                    }
                    disabled={props.selectedSegment !== "list"}
                  />
                </div>
                <div className={styles.buttonContainer}>
                  <IconButton
                    type="card"
                    onClick={() =>
                      props.onChangeSegment && props.onChangeSegment("card")
                    }
                    disabled={props.selectedSegment !== "card"}
                  />
                </div>
              </div>
            </>
          ) : (
            <div />
          )}
          <div className={styles.sort}>
            <Sort items={props.sortList} />
          </div>
        </div>
        <Search
          onSearch={onSearch}
          placeholder="キーワード検索"
          className={styles.search}
        />
      </div>
    </header>
  );
};

export default SegmentHeader;
