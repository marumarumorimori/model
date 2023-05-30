import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./style.scss";
import { convertFavorite } from "../common";
import { Link } from "react-router-dom";
import { Article } from "@/api/typescript-axios/api";
import Empty from "../Empty";
import dayjs from "dayjs";
import cn from "classnames";

interface CardProps {
  article: Article;
  index: number;
  display: number;
}

const Card: React.FunctionComponent<CardProps> = (props) => {
  const imgRef = useRef<HTMLDivElement>(null);
  const [type, setType] = useState<"pc" | "sp">();

  const favorite = useMemo(() => {
    return convertFavorite(props.article.good || 0);
  }, [props.article.good]);

  useEffect(() => {
    const resize = () => {
      setType(window.innerWidth > 768 ? "pc" : "sp");

      if (!imgRef.current) return;

      imgRef.current.style.height = `${imgRef.current.clientWidth}px`;
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div
      className={cn(styles.border, {
        [styles.right]:
          type === "pc"
            ? props.index % 4 !== 3 && props.index !== props.display - 1
            : props.index % 2 !== 1,
        [styles.bottom]: type === "pc" ? props.index < 16 : props.index < 18,
      })}
    >
      <div className={styles.cardComponent}>
        <Link to={`/articles/${props.article.id}`} className={styles.card}>
          <div className={styles.container}>
            <div className={styles.imageContainer} ref={imgRef}>
              <img src={props.article.image} alt="" />
              {!props.article.public && (
                <div className={styles.state}>非公開</div>
              )}
              <div className={styles.info}>
                <div className={styles.favorite}>{favorite}</div>
                <div className={styles.date}>
                  {dayjs(props.article.postedAt).format("YYYY/MM/DD hh:mm")}
                </div>
              </div>
            </div>
            <table>
              <tbody>
                <tr>
                  <th>投稿ID</th>
                  <td className={styles.id}>{props.article.id}</td>
                </tr>
                <tr>
                  <th>ユーザーID</th>
                  <td className={styles.userId}>{props.article.userId}</td>
                </tr>
                <tr>
                  <th>ニックネーム</th>
                  <td className={styles.userName}>
                    ({props.article.nickname})
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Link>
      </div>
      <div className={styles.missingTopLeft}></div>
      <div className={styles.missingBottomRight} />
    </div>
  );
};

interface Props {
  list: Article[];
  searched: boolean;
}

const CardList: React.FunctionComponent<Props> = (props) => {
  return (
    <div className={styles.cards}>
      {props.list.length ? (
        props.list.map((item, index) => (
          <Card
            article={item}
            index={index}
            key={index}
            display={props.list.length}
          />
        ))
      ) : (
        <Empty searched={props.searched} />
      )}
    </div>
  );
};

export default CardList;
