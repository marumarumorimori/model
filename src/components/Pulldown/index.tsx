import React, { useEffect, useRef } from "react";
import styles from "./style.scss";
import cn from "classnames";

export interface Item {
  value: string;
  text: string;
  onClick: (value: string) => void;
  danger?: boolean;
}

interface Props {
  items: Item[];
  className?: string;
  onClose: () => void;
  onChange?: (value: Item) => void;
}

const Pulldown: React.FunctionComponent<Props> = (props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleClose = (e: any) => {
    if (!wrapperRef.current) return;

    if (!wrapperRef.current.contains(e.target)) {
      props.onClose();
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClose);

    return () => window.removeEventListener("click", handleClose);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cn(styles.component, props.className)} ref={wrapperRef}>
      {props.items.map((item, index) => (
        <div
          className={cn(styles.item, { [styles.danger]: item.danger })}
          onClick={() => {
            item.onClick(item.value);
            props.onChange && props.onChange(item);
          }}
          key={index}
        >
          {item.text}
        </div>
      ))}
    </div>
  );
};

export default Pulldown;
