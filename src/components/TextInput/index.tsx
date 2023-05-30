import React from "react";
import styles from "./style.scss";
import cn from "classnames";

interface Props {
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email" | "password";
  className?: string;
  label?: string;
  placeholder?: string;
  error?: string | boolean;
}

const TextInput: React.FunctionComponent<Props> = (props) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(event.target.value);
  };

  return (
    <div className={cn(styles.component, props.className)}>
      {props.label ? (
        <>
          <label className={styles.label}>
            {props.label}
            <input
              className={cn(styles.input, { [styles.error]: props.error })}
              type={props.type}
              value={props.value}
              placeholder={props.placeholder}
              onChange={(event) => onChange(event)}
            />
          </label>
          {props.error && typeof props.error === "string" && (
            <div className={styles.errorMessage}>{props.error}</div>
          )}
        </>
      ) : (
        <>
          <input
            className={cn(styles.input, { [styles.error]: props.error })}
            type={props.type}
            value={props.value}
            placeholder={props.placeholder}
            onChange={(event) => onChange(event)}
          />
          {props.error && typeof props.error === "string" && (
            <div className={styles.errorMessage}>{props.error}</div>
          )}
        </>
      )}
    </div>
  );
};

export default TextInput;
