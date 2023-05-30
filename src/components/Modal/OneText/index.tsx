import React, { useEffect, useState } from "react";
import styles from "./style.scss";
import ModalContainer from "../Common";
import TextInput from "@/components/TextInput";
import Button from "@/components/Button/Text";

interface Props {
  title: string;
  content: string;
  isVisible: boolean;
  primaryText: string;
  secondaryText: string;
  label: string;
  setPrimaryDisabled?: boolean;
  onPrimaryClick: (value: string) => void;
  onSecondaryClick: () => void;
  onClose: () => void;
  error?: string;
}

const Modal: React.FunctionComponent<Props> = (props) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (!props.isVisible) {
      setValue("");
    }
  }, [props.isVisible]);

  if (!props.isVisible) return null;

  return (
    <ModalContainer
      title={props.title}
      content={props.content}
      onClose={props.onClose}
    >
      <div className={styles.container}>
        <TextInput
          value={value}
          onChange={(val) => setValue(val)}
          placeholder=""
          label={props.label}
          error={props.error}
        />
      </div>
      <div className={styles.buttons}>
        <div className={styles.buttonContainer}>
          <Button
            type="normal"
            form="secondary"
            onClick={props.onSecondaryClick}
          >
            {props.secondaryText}
          </Button>
        </div>
        <div className={styles.buttonContainer}>
          <Button
            type="normal"
            onClick={() => {
              props.onPrimaryClick(value);
            }}
            disabled={props.setPrimaryDisabled && value === ""}
          >
            {props.primaryText}
          </Button>
        </div>
      </div>
    </ModalContainer>
  );
};

export default Modal;
