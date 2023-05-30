import React from "react";
import styles from "./style.scss";
import cn from "classnames";
import IcArrowLeft from "@/assets/images/icon/ic_arrow_left.png";
import IcArrowRight from "@/assets/images/icon/ic_arrow_right.png";

interface Props {
  current: number;
  lastPage: number;
  onChangePage: (page: number) => void;
}

const PageNumber: React.FunctionComponent<{
  number: number;
  selected: boolean;
  current: boolean;
  last?: boolean;
  onClick: (page: number) => void;
}> = (props) => {
  return (
    <div
      className={cn(styles.pageNumber, {
        [styles.selected]: props.selected,
        [styles.current]: props.current,
        [styles.last]: props.last,
      })}
      onClick={() => props.onClick(props.number)}
    >
      {props.number}
    </div>
  );
};

const ThreePoint: React.FunctionComponent = () => {
  return <div className={styles.threePoint}>...</div>;
};

const LessFive: React.FunctionComponent<{
  current: number;
  lastPage: number;
  onClick: (page: number) => void;
}> = (props) => {
  return (
    <div className={styles.pageOne}>
      {[...Array(props.lastPage)].map((_, index) => {
        return (
          <PageNumber
            number={index + 1}
            selected={index + 1 === props.current}
            current={index + 1 === props.current}
            onClick={(page) => props.onClick(page)}
            key={index}
          />
        );
      })}
    </div>
  );
};

const PageOne: React.FunctionComponent<{
  lastPage: number;
  onClick: (page: number) => void;
}> = (props) => {
  return (
    <div
      className={cn(styles.pageOne, {
        [styles.marginRight]: props.lastPage > 5,
      })}
    >
      {[...Array(3)].map((_, index) => {
        return (
          <PageNumber
            number={index + 1}
            selected={index + 1 === 1}
            current={index + 1 === 1}
            onClick={(page) => props.onClick(page)}
            key={index}
          />
        );
      })}
      <ThreePoint />
      <PageNumber
        number={props.lastPage}
        selected={false}
        current={false}
        onClick={(page) => props.onClick(page)}
      />
      <div className={styles.right} onClick={() => props.onClick(2)}>
        <img src={IcArrowRight} alt="right" />
      </div>
    </div>
  );
};

const PageTwo: React.FunctionComponent<{
  lastPage: number;
  onClick: (page: number) => void;
}> = (props) => {
  return (
    <div className={styles.pageTwo}>
      <div className={styles.left} onClick={() => props.onClick(1)}>
        <img src={IcArrowLeft} alt="left" />
      </div>
      <PageNumber
        number={1}
        selected={false}
        current={false}
        onClick={props.onClick}
      />
      <PageNumber
        number={2}
        selected={true}
        current={true}
        onClick={props.onClick}
      />
      <PageNumber
        number={3}
        selected={false}
        current={false}
        onClick={props.onClick}
      />
      <ThreePoint />
      <PageNumber
        number={props.lastPage}
        selected={false}
        current={false}
        onClick={props.onClick}
      />
      <div className={styles.right} onClick={() => props.onClick(3)}>
        <img src={IcArrowRight} alt="right" />
      </div>
    </div>
  );
};

const PageLastTwo: React.FunctionComponent<{
  lastPage: number;
  onClick: (page: number) => void;
}> = (props) => {
  return (
    <div className={styles.pageLastTwo}>
      <div
        className={styles.left}
        onClick={() => props.onClick(props.lastPage - 2)}
      >
        <img src={IcArrowLeft} alt="left" />
      </div>
      <PageNumber
        number={1}
        selected={false}
        current={false}
        onClick={props.onClick}
      />
      <ThreePoint />
      <PageNumber
        number={props.lastPage - 2}
        selected={false}
        current={false}
        onClick={props.onClick}
      />
      <PageNumber
        number={props.lastPage - 1}
        selected={true}
        current={true}
        onClick={props.onClick}
      />
      <PageNumber
        number={props.lastPage}
        selected={false}
        current={false}
        onClick={props.onClick}
      />
      <div
        className={styles.right}
        onClick={() => props.onClick(props.lastPage)}
      >
        <img src={IcArrowRight} alt="right" />
      </div>
    </div>
  );
};

const PageLast: React.FunctionComponent<{
  lastPage: number;
  onClick: (page: number) => void;
}> = (props) => {
  return (
    <div className={styles.lastPage}>
      <div
        className={styles.left}
        onClick={() => props.onClick(props.lastPage - 1)}
      >
        <img src={IcArrowLeft} alt="left" />
      </div>
      <PageNumber
        number={1}
        selected={false}
        current={false}
        onClick={props.onClick}
      />
      <ThreePoint />
      <PageNumber
        number={props.lastPage - 2}
        selected={false}
        current={false}
        onClick={props.onClick}
      />
      <PageNumber
        number={props.lastPage - 1}
        selected={false}
        current={false}
        onClick={props.onClick}
      />
      <PageNumber
        number={props.lastPage}
        selected={true}
        current={true}
        onClick={props.onClick}
        last={true}
      />
    </div>
  );
};

const Page: React.FunctionComponent<{
  current: number;
  lastPage: number;
  onClick: (page: number) => void;
}> = (props) => {
  return (
    <div className={styles.page}>
      <div
        className={styles.left}
        onClick={() => props.onClick(props.current - 1)}
      >
        <img src={IcArrowLeft} alt="left" />
      </div>
      <PageNumber
        number={1}
        selected={false}
        current={false}
        onClick={props.onClick}
      />
      <ThreePoint />
      <PageNumber
        number={props.current - 1}
        selected={false}
        current={false}
        onClick={props.onClick}
      />
      <PageNumber
        number={props.current}
        selected={true}
        current={true}
        onClick={props.onClick}
      />
      <PageNumber
        number={props.current + 1}
        selected={false}
        current={false}
        onClick={props.onClick}
      />
      <ThreePoint />
      <PageNumber
        number={props.lastPage}
        selected={false}
        current={false}
        onClick={props.onClick}
      />
      <div
        className={styles.right}
        onClick={() => props.onClick(props.current + 1)}
      >
        <img src={IcArrowRight} alt="right" />
      </div>
    </div>
  );
};

const Pager: React.FunctionComponent<Props> = (props) => {
  if (props.lastPage <= 5) {
    return (
      <LessFive
        current={props.current}
        lastPage={props.lastPage}
        onClick={props.onChangePage}
      />
    );
  }

  if (props.current === 1) {
    return <PageOne lastPage={props.lastPage} onClick={props.onChangePage} />;
  }
  if (props.current === 2) {
    return <PageTwo lastPage={props.lastPage} onClick={props.onChangePage} />;
  }

  if (props.lastPage - 1 === props.current) {
    return (
      <PageLastTwo lastPage={props.lastPage} onClick={props.onChangePage} />
    );
  }

  if (props.lastPage === props.current) {
    return <PageLast lastPage={props.lastPage} onClick={props.onChangePage} />;
  }

  return (
    <Page
      current={props.current}
      lastPage={props.lastPage}
      onClick={props.onChangePage}
    />
  );
};

export default Pager;
