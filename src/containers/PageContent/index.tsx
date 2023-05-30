import React from "react";
import styles from "./style.scss";
import cn from "classnames";

interface Props {
  className?: string;
}

export const PageContainer: React.FunctionComponent<Props> = (props) => {
  return (
    <div className={cn(styles.container, props.className)}>
      {props.children}
    </div>
  );
};

export default PageContainer;
