import React from "react";
import styles from "./style.scss";
import Button from "@/components/Button/Text";

interface Props {
  title: string;
  publish: boolean;
  onChangePublish: (publish: boolean) => void;
}

const Publish: React.FunctionComponent<Props> = (props) => {
  return (
    <header className={styles.component}>
      <div className={styles.title}>{props.title}</div>
      <div className={styles.publish}>
        <Button
          type="mini"
          form={props.publish ? "primary" : "secondary"}
          disabledStyle={!props.publish}
          className={styles.button}
          onClick={() => props.onChangePublish(!props.publish)}
        >
          {props.publish ? "使用中" : "停止中"}
        </Button>
      </div>
    </header>
  );
};

export default Publish;
