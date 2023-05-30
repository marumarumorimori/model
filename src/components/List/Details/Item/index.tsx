import React, { ReactElement } from "react";
import styles from "./style.scss";
import cn from "classnames";

interface Props {
  label: string;
  content: string | number;
  className?: string;
  after?: ReactElement | true;
  stretch?: boolean;
  onIconClick?: () => void;
}

const Item: React.FunctionComponent<Props> = (props) => {
  return (
    <div
      className={cn(styles.component, props.className, {
        [styles.iconInclude]: props.after || props.stretch,
      })}
    >
      <div className={cn(styles.label)}>
        <span>{props.label}</span>
        {props.after}
      </div>
      <div className={styles.content}>{props.content}</div>
    </div>
  );
};

export default Item;
