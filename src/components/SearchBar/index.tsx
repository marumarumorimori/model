import React, { useState } from "react";
import styles from "./style.scss";
import cn from "classnames";
import SearchIcon from "@/assets/images/icon/btn_search.png";

interface Props {
  onSearch: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar: React.FunctionComponent<Props> = (props) => {
  const [focus, setFocus] = useState(false);
  const [value, setValue] = useState("");

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      props.onSearch(value);
    }
  };

  return (
    <div
      className={cn(styles.component, props.className, {
        [styles.focus]: focus,
      })}
    >
      <input
        type="text"
        placeholder={props.placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onKeyDown={onKeyDown}
      />
      <img
        src={SearchIcon}
        alt="search"
        onClick={() => props.onSearch(value)}
      />
    </div>
  );
};

export default SearchBar;
