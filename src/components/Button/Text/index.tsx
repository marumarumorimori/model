import React, { useMemo } from "react";
import styles from "./style.scss";
import cn from "classnames";
import Add from "@/assets/images/icon/ic_add.png";

interface Props {
  type?: "A" | "B" | "C" | "normal" | "mini" | "link" | "Function" | "Trash";
  form?: "primary" | "secondary";
  className?: string;
  disabled?: boolean;
  disabledStyle?: boolean;
  onClick: () => void;
}

const Button: React.FunctionComponent<Props> = (props) => {
  const style = useMemo(() => {
    switch (props.type) {
      case "A":
      case "normal":
        if (!props.form || props.form === "primary") {
          return cn(styles.normal, styles.primary, {
            [styles.disabled]: props.disabledStyle,
          });
        }
        return cn(styles.normal, styles.secondary, {
          [styles.disabled]: props.disabledStyle,
        });
      case "B":
      case "mini":
        if (!props.form || props.form === "primary") {
          return cn(styles.mini, styles.primary);
        }
        return cn(styles.mini, styles.secondary);
      case "C":
      case "link":
        return cn(styles.link);
      case "Function":
        return styles.function;
      case "Trash":
        return styles.trash;
      default:
        return cn(styles.normal, styles.primary);
    }
  }, [props.type, props.form, props.disabledStyle]);

  if (props.type === "Function") {
    return (
      <button
        className={cn(style, props.className)}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        <img src={Add} alt="add" />
        {props.children}
      </button>
    );
  }

  if (props.type === "Trash") {
    return (
      <button
        className={cn(style, props.className)}
        disabled={props.disabled}
        onClick={props.onClick}
      >
        <div className={styles.icon} />
        {props.children}
      </button>
    );
  }

  return (
    <button
      className={cn(style, props.className)}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
