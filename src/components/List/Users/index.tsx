import React from "react";
import styles from "./style.scss";
import { User } from "@/api/typescript-axios/api";
import { Link } from "react-router-dom";
import UserImg from "@/assets/images/icon/ic_user_large.png";
import CalendarImg from "@/assets/images/icon/ic_calender_large.png";

interface Props {
  users: User[];
}

const Users: React.FunctionComponent<Props> = (props) => {
  if (!props.users.length) {
    return (
      <div className={styles.empty}>該当するユーザーは見つかりませんでした</div>
    );
  }

  return (
    <div>
      <Header />
      {props.users.map((user, index) => (
        <Col user={user} key={index} />
      ))}
    </div>
  );
};

const Header: React.FunctionComponent = () => {
  return (
    <div className={styles.header}>
      <div className={styles.headerCol}>画像</div>
      <div className={styles.headerCol}>ユーザーID</div>
      <div className={styles.headerCol}>ニックネーム</div>
      <div className={styles.headerCol}>登録日時</div>
      <div className={styles.headerCol}>凍結設定</div>
    </div>
  );
};

interface ColProps {
  user: User;
}

const Col: React.FunctionComponent<ColProps> = (props) => {
  return (
    <div className={styles.container}>
      <Link to={`/users/${props.user.id}`}>
        <div className={styles.row}>
          <div className={styles.imageContainer}>
            {props.user.frozen && <div className={styles.frozen}>停止中</div>}
            <img src={props.user.icon} alt="img" />
          </div>
          <div className={styles.right}>
            <div className={styles.rowInfo}>
              <img src={UserImg} alt="user" />
              <div className={styles.id}>{props.user.id}</div>
            </div>
            <div className={styles.name}>
              <span className={styles.pc}>{props.user.nickname}</span>
              <span className={styles.sp}>({props.user.nickname})</span>
            </div>
            <div className={styles.sub}>
              <div className={styles.rowInfo}>
                <img src={CalendarImg} alt="user" />
                <div className={styles.date}>{props.user.createdAt}</div>
              </div>
              <div className={styles.frozen}>
                {props.user.frozen ? "停止中" : "使用中"}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Users;
