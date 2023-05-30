import React, { useState } from "react";
import styles from "./style.scss";
import ModalContainer from "../Common";
import Button from "@/components/Button/Text";
import TextInput from "@/components/TextInput";

interface Props {
  title: string;
  content: string;
  primaryText: string;
  secondaryText: string;
  isVisible: boolean;
  primaryType?: "text" | "password" | "email";
  secondaryType?: "text" | "password";
  firstLabel: string;
  secondLabel: string;
  setPrimaryDisabled?: boolean;
  onPrimaryClick: (firstValue: string, secondValue: string) => void;
  onSecondaryClick: () => void;
  onPrimaryChange?: (value: string) => void;
  onClose: () => void;
  firstError?: string;
  secondError?: boolean | string;
}

const TwoText: React.FunctionComponent<Props> = (props) => {
  const [value, setValue] = useState("");
  const [confirmValue, setConfirmValue] = useState("");

  if (!props.isVisible) return null;

  return (
    <ModalContainer
      title={props.title}
      content={props.content}
      onClose={props.onClose}
    >
      <div className={styles.textInput}>
        <TextInput
          value={value}
          onChange={(val) => {
            props.onPrimaryChange && props.onPrimaryChange(val);
            setValue(val);
          }}
          type={props.primaryType || "text"}
          label={props.firstLabel}
          error={props.firstError}
        />
      </div>
      <TextInput
        value={confirmValue}
        onChange={(val) => setConfirmValue(val)}
        type={props.secondaryType || "text"}
        label={props.secondLabel}
        error={props.secondError}
      />

      <div className={styles.buttons}>
        <div className={styles.buttonContainer}>
          <Button
            onClick={props.onSecondaryClick}
            type="normal"
            form="secondary"
          >
            {props.secondaryText}
          </Button>
        </div>
        <div className={styles.buttonContainer}>
          <Button
            onClick={() => props.onPrimaryClick(value, confirmValue)}
            disabled={
              props.setPrimaryDisabled && (value === "" || confirmValue === "")
            }
          >
            {props.primaryText}
          </Button>
        </div>
      </div>
    </ModalContainer>
  );
};

export default TwoText;
