import React from "react";
import styles from "./style.scss";
import Button from "@/components/Button/Text";

interface Props {
  publish: boolean;
  onChangePublish: (value: boolean) => void;
}

const Header: React.FunctionComponent<Props> = (props) => {
  return (
    <header>
      <div className={styles.header}>
        <div className={styles.title}>記事詳細</div>
        <div className={styles.button}>
          <Button
            type="mini"
            form={props.publish ? "primary" : "secondary"}
            disabledStyle={!props.publish}
            onClick={() => props.onChangePublish(!props.publish)}
          >
            {props.publish ? "公開" : "非公開"}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
