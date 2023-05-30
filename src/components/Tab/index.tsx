import React, { useState } from "react";
import styles from "./style.scss";
import cn from "classnames";

interface Item {
  value: string;
  text: string;
}

interface Props {
  items: Item[];
  onChange: (value: string) => void;
  defaultValue?: string;
}

const Tab: React.FunctionComponent<Props> = (props) => {
  const [selected, setSelected] = useState(
    props.defaultValue || props.items[0].value
  );

  const onChange = (value: string) => {
    if (selected !== value) {
      setSelected(value);
      props.onChange(value);
    }
  };

  return (
    <ul className={styles.component}>
      {props.items.map((item) => (
        <li
          className={cn({ [styles.selected]: item.value === selected })}
          onClick={() => onChange(item.value)}
          key={item.value}
        >
          {item.text}
        </li>
      ))}
    </ul>
  );
};

export default Tab;
