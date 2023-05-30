import React, { useMemo } from "react";
import styles from "./style.scss";
import { convertFavorite } from "../common";
import { Link } from "react-router-dom";
import { Article } from "@/api/typescript-axios/api";
import Empty from "../Empty";
import dayjs from "dayjs";
import cn from "classnames";
import IdImg from "@/assets/images/icon/ic_id_large.png";
import UserImg from "@/assets/images/icon/ic_user_large.png";
import CalendarImg from "@/assets/images/icon/ic_calender_large.png";

interface Props {
  list: Article[];
  searched: boolean;
  isUserArticles?: boolean;
}

const List: React.FunctionComponent<Props> = (props) => {
  return (
    <div className={styles.component}>
      {props.list.length ? (
        <>
          <Header isUserArticles={props.isUserArticles} />
          {props.list.map((l, index) => (
            <Col item={l} key={index} isUserArticles={props.isUserArticles} />
          ))}
        </>
      ) : (
        <Empty searched={props.searched} />
      )}
    </div>
  );
};

interface HeaderProps {
  isUserArticles?: boolean;
}

const Header: React.FunctionComponent<HeaderProps> = (props) => {
  return (
    <div
      className={cn(styles.header, {
        [styles.userArticles]: props.isUserArticles,
      })}
    >
      <div className={styles.headerCol}>画像</div>
      <div className={styles.headerCol}>投稿ID</div>
      {!props.isUserArticles && (
        <>
          <div className={styles.headerCol}>ユーザーID</div>
          <div className={styles.headerCol}>ニックネーム</div>
        </>
      )}
      <div className={styles.headerCol}>いいね</div>
      <div className={styles.headerCol}>投稿日時</div>
      <div className={styles.headerCol}>公開状態</div>
    </div>
  );
};

const Col: React.FunctionComponent<{
  item: Article;
  isUserArticles?: boolean;
}> = (props) => {
  const favorite = useMemo(() => {
    return convertFavorite(props.item.good);
  }, [props.item.good]);

  return (
    <div className={styles.colComponent}>
      <Link to={`/articles/${props.item.id}`}>
        <div
          className={cn(styles.col, {
            [styles.userArticles]: props.isUserArticles,
          })}
        >
          <div className={styles.imageContainer}>
            {!props.item.public && <div className={styles.private}>非公開</div>}
            <img src={props.item.image} alt="curry" />
            <div className={styles.imageFavorite}>{favorite}</div>
          </div>
          <div className={styles.right}>
            <div className={styles.row}>
              <img src={IdImg} alt="id" />
              <div className={styles.id}>{props.item.id}</div>
            </div>
            {!props.isUserArticles && (
              <>
                <div className={styles.row}>
                  <img src={UserImg} alt="user" />
                  <div className={styles.userId}>{props.item.userId}</div>
                </div>
                <div className={styles.userName}>
                  <span className={styles.pc}>{props.item.nickname}</span>
                  <span className={styles.sp}>({props.item.nickname})</span>
                </div>
              </>
            )}
            <div className={styles.favorite}>{favorite}</div>
            <div className={styles.row}>
              <img src={CalendarImg} alt="calendar" />
              <div className={styles.date}>
                {dayjs(props.item.postedAt).format("YYYY/MM/DD hh:mm")}
              </div>
            </div>
            <div className={styles.publish}>
              {props.item.public ? "公開" : "非公開"}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default List;
