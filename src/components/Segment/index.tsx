import React from "react";
import styles from "./style.scss";
import ListActive from "@/assets/images/icon/ic_list_active.png";
import ListInactive from "@/assets/images/icon/ic_list_inactive.png";
import CardActive from "@/assets/images/icon/ic_card_active.png";
import CardInactive from "@/assets/images/icon/ic_card_inactive.png";

import cn from "classnames";

export type Choice = "list" | "card";

interface Props {
  selected: Choice;
  onChange: (type: Choice) => void;
}

const Segment: React.FunctionComponent<Props> = (props) => {
  const onClick = (type: Choice) => {
    if (props.selected !== type) {
      props.onChange(type);
    }
  };

  return (
    <div className={styles.component}>
      <div
        className={cn(styles.list, {
          [styles.active]: props.selected === "list",
        })}
        onClick={() => onClick("list")}
      >
        <img
          src={props.selected === "list" ? ListActive : ListInactive}
          alt="list"
        />
      </div>
      <div
        className={cn(styles.list, {
          [styles.active]: props.selected === "card",
        })}
        onClick={() => onClick("card")}
      >
        <img
          src={props.selected === "card" ? CardActive : CardInactive}
          alt="list"
        />
      </div>
    </div>
  );
};

export default Segment;
