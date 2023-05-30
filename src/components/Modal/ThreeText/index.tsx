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
  firstType?: "text" | "password" | "email";
  firstLabel: string;
  secondType?: "text" | "password";
  secondLabel: string;
  thirdType?: "text" | "password";
  thirdLabel: string;

  onPrimaryClick: (
    firstValue: string,
    secondValue: string,
    thirdValue: string
  ) => void;
  onSecondaryClick: () => void;
  onClose: () => void;
  onSecondaryChange?: (value: string) => void;
  setPrimaryDisabled?: boolean;
  firstError?: string | boolean;
  secondError?: string | boolean;
  thirdError?: string | boolean;
}

const ThreeText: React.FunctionComponent<Props> = (props) => {
  const [firstValue, setFristValue] = useState("");
  const [secondValue, setSecondValue] = useState("");
  const [thirdValue, setThirdValue] = useState("");

  if (!props.isVisible) return null;

  return (
    <ModalContainer
      title={props.title}
      content={props.content}
      onClose={props.onClose}
    >
      <div className={styles.textInput}>
        <TextInput
          value={firstValue}
          onChange={(val) => setFristValue(val)}
          type={props.firstType || "text"}
          label={props.firstLabel}
          error={props.firstError}
        />
      </div>
      <div className={styles.textInput}>
        <TextInput
          value={secondValue}
          onChange={(val) => {
            props.onSecondaryChange && props.onSecondaryChange(val);
            setSecondValue(val);
          }}
          type={props.secondType || "text"}
          label={props.secondLabel}
          error={props.secondError}
        />
      </div>
      <div className={styles.textInput}>
        <TextInput
          value={thirdValue}
          onChange={(val) => setThirdValue(val)}
          type={props.thirdType || "text"}
          label={props.thirdLabel}
          error={props.thirdError}
        />
      </div>

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
            onClick={() =>
              props.onPrimaryClick(firstValue, secondValue, thirdValue)
            }
            disabled={
              props.setPrimaryDisabled &&
              (firstValue === "" || secondValue === "" || thirdValue === "")
            }
          >
            {props.primaryText}
          </Button>
        </div>
      </div>
    </ModalContainer>
  );
};

export default ThreeText;
