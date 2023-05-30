import React from "react";
import styles from "./style.scss";
import ModalContainer from "../Common";
import Button from "@/components/Button/Text";
interface Props {
  title: string;
  content: string;
  isVisible: boolean;
  text: string;
  onSelected: () => void;
  onClose: () => void;
}

const OneChoice: React.FunctionComponent<Props> = (props) => {
  if (!props.isVisible) return null;

  return (
    <ModalContainer
      title={props.title}
      content={props.content}
      onClose={props.onClose}
    >
      <div className={styles.buttonContainer}>
        <Button onClick={() => props.onSelected()} className={styles.button}>
          {props.text}
        </Button>
      </div>
    </ModalContainer>
  );
};

export default OneChoice;
