import React, { useEffect, useState } from "react";
import styles from "./style.scss";
import { useDetail } from "./hook";
import PageContainer from "@/containers/PageContent";
import Tab from "@/components/Tab";
import Header from "@/components/Header/Publish";
import List from "@/components/List/Details/Item";
import Articles from "@/components/Articles/List";
import Pager from "@/components/Pager";
import SegmentHeader from "@/components/Header/Segment";
import cn from "classnames";
import { RouteComponentProps } from "react-router-dom";
import TwoChoice from "@/components/Modal/TwoChoice";

const UserDetail: React.FunctionComponent<
  RouteComponentProps<{ id: string }>
> = (props) => {
  const [selectedTab, setSelectedTab] = useState("info");
  const {
    user,
    articles,
    articleParams,
    changeFrozen,
    initialize,
    sortArticles,
    onSearch,
    onChangePage,
  } = useDetail(Number(props.match.params.id));
  const [frozenModal, setFrozenModal] = useState(false);

  useEffect(() => {
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user) return null;

  const userInfo = [
    { label: "ユーザーID", content: user.userId },
    { label: "ニックネーム", content: user.nickname },
    { label: "登録日", content: user.createdAt },
    { label: "紹介文", content: user.introduction },
  ];

  return (
    <>
      <div className={styles.tabContainer}>
        <Tab
          items={[
            { text: "基本情報", value: "info" },
            { text: "記事一覧", value: "article" },
          ]}
          onChange={setSelectedTab}
        />
      </div>
      <PageContainer
        className={cn(styles.tab, {
          [styles.selected]: selectedTab === "info",
        })}
      >
        <Header
          title="ユーザー詳細"
          publish={!user.frozen}
          onChangePublish={() => setFrozenModal(true)}
        />
        <div className={styles.detail}>
          <div>
            {userInfo.map((item, index) => (
              <List label={item.label} content={item.content} key={index} />
            ))}
          </div>
          <div className={styles.imageContainer}>
            <img src={user.icon} alt="img" />
          </div>
        </div>
      </PageContainer>
      <PageContainer
        className={cn(styles.tab, {
          [styles.selected]: selectedTab === "article",
        })}
      >
        <div className={styles.segmentHeader}>
          <SegmentHeader
            title="記事一覧"
            onSearch={onSearch}
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
        {articles && (
          <>
            <Articles list={articles} searched={true} isUserArticles={true} />
            <div className={styles.pager}>
              <Pager
                current={articleParams.page}
                lastPage={Math.ceil(articles.length / 20)}
                onChangePage={onChangePage}
              />
            </div>
          </>
        )}
      </PageContainer>
      <TwoChoice
        title="使用状態設定"
        content={
          user.frozen
            ? "ユーザーを使用可能にしますか"
            : "ユーザーを停止状態にしますか"
        }
        isVisible={frozenModal}
        primaryText="はい"
        secondaryText="いいえ"
        onPrimaryClick={() => {
          changeFrozen(!user.frozen);
          setFrozenModal(false);
        }}
        onSecondaryClick={() => setFrozenModal(false)}
        onClose={() => setFrozenModal(false)}
      />
    </>
  );
};

export default UserDetail;
