import React from "react";
import styles from "./style.scss";
import ModalContainer from "../Common";
import Button from "@/components/Button/Text";

interface Props {
  title: string;
  content: string;
  isVisible: boolean;
  primaryText: string;
  secondaryText: string;
  onPrimaryClick: () => void;
  onSecondaryClick: () => void;
  onClose: () => void;
}

const TwoChoice: React.FunctionComponent<Props> = (props) => {
  if (!props.isVisible) return null;

  return (
    <ModalContainer
      title={props.title}
      content={props.content}
      onClose={props.onClose}
    >
      <div className={styles.buttonContainer}>
        <div className={styles.secondary}>
          <Button
            onClick={() => props.onSecondaryClick()}
            className={styles.button}
            type="normal"
            form="secondary"
          >
            {props.secondaryText}
          </Button>
        </div>
        <Button
          onClick={() => props.onPrimaryClick()}
          className={styles.button}
        >
          {props.primaryText}
        </Button>
      </div>
    </ModalContainer>
  );
};

export default TwoChoice;
