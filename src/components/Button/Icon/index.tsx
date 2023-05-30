import React, { useMemo } from "react";
import styles from "./style.scss";
import cn from "classnames";

interface Props {
  type?: "list" | "card";
  disabled?: boolean;
  onClick: () => void;
}

const Icon: React.FunctionComponent<Props> = (props) => {
  const typeStyle = useMemo(() => {
    if (props.type === "list" || props.type === undefined) {
      return styles.list;
    } else {
      return styles.card;
    }
  }, [props.type]);

  return (
    <div
      className={cn(styles.component, typeStyle, {
        [styles.disabled]: props.disabled,
      })}
      onClick={props.onClick}
    />
  );
};

export default Icon;
