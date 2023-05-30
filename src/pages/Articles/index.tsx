import React, { useState } from "react";
import { useArticles } from "./hook";
import styles from "./style.scss";
import PageContainer from "@/containers/PageContent";
import Header from "@/components/Header/Segment";
import ArticleList from "@/components/Articles/List";
import ArticleCard from "@/components/Articles/Card";
import Pager from "@/components/Pager";
import { Choice } from "@/components/Segment";

const Articles: React.FunctionComponent = () => {
  const [type, setType] = useState<Choice>("list");
  const {
    articles,
    searchArticles,
    sortArticles,
    changePageArticles,
    currentPage,
    articleParams,
    total,
  } = useArticles();

  return (
    <PageContainer>
      <div className={styles.header}>
        <Header
          title="記事一覧"
          onSearch={(value) => searchArticles(value)}
          placeholder="キーワード検索"
          onChangeSegment={(type) => setType(type)}
          selectedSegment={type}
          sortList={[
            {
              text: "レコードID(昇順)",
              value: "recordIdAsc",
              onClick: () => sortArticles("id", "asc"),
            },
            {
              text: "レコードID(降順)",
              value: "recordIdDesc",
              onClick: () => sortArticles("id", "desc"),
            },
            {
              text: "ログインID(昇順)",
              value: "loginIdAsc",
              onClick: () => sortArticles("userId", "asc"),
            },
            {
              text: "ログインID(降順)",
              value: "loginIdDesc",
              onClick: () => sortArticles("userId", "desc"),
            },
            {
              text: "ニックネーム(昇順)",
              value: "nameAsc",
              onClick: () => sortArticles("nickname", "asc"),
            },
            {
              text: "ニックネーム(昇順)",
              value: "nameDesc",
              onClick: () => sortArticles("nickname", "desc"),
            },
            {
              text: "いいね(昇順)",
              value: "likeAsc",
              onClick: () => sortArticles("good", "asc"),
            },
            {
              text: "いいね(降順)",
              value: "likeDesc",
              onClick: () => sortArticles("good", "desc"),
            },
            {
              text: "投稿日時(昇順)",
              value: "createdAtAsc",
              onClick: () => sortArticles("created_at", "asc"),
            },
            {
              text: "投稿日時(降順)",
              value: "createdAtDesc",
              onClick: () => sortArticles("created_at", "desc"),
            },
            {
              text: "公開状態	(昇順)",
              value: "statusAsc",
              onClick: () => sortArticles("status", "asc"),
            },
            {
              text: "公開状態	(降順)",
              value: "statusDesc",
              onClick: () => sortArticles("status", "desc"),
            },
          ]}
        />
      </div>
      {articles &&
        (type === "list" ? (
          <ArticleList
            list={articles}
            searched={Boolean(articleParams.keyword)}
          />
        ) : (
          <ArticleCard
            list={articles}
            searched={Boolean(articleParams.keyword)}
          />
        ))}
      {articles && articles.length && total ? (
        <div className={styles.pager}>
          <Pager
            current={currentPage}
            lastPage={Math.ceil(currentPage / 20)}
            onChangePage={(value) => changePageArticles(value)}
          />
        </div>
      ) : null}
    </PageContainer>
  );
};

export default Articles;
