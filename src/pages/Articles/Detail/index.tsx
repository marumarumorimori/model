import React, { useState, useEffect } from "react";
import styles from "./style.scss";
import { useDetail } from "./hook";
import { RouteComponentProps } from "react-router-dom";
import PageContainer from "@/containers/PageContent";
import Header from "./Header";
import Item from "@/components/List/Details/Item";
import Button from "@/components/Button/Text";
import TwoChoice from "@/components/Modal/TwoChoice";
import dayjs from "dayjs";

interface Props extends RouteComponentProps<{ id: string }> {}

const Detail: React.FunctionComponent<Props> = (props) => {
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [visibleOnPrivate, setVisibleOnPrivate] = useState(false);
  const [visibleOnPublic, setVisibleOnPublic] = useState(false);

  const { init, article, onChangePublish, onDelete } = useDetail(
    Number(props.match.params.id)
  );

  const onVisibleModal = () => {
    if (!article) return;

    if (article.public) {
      setVisibleOnPrivate(true);
      return;
    }
    setVisibleOnPublic(true);
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!article) return null;

  return (
    <PageContainer>
      <Header publish={article.public} onChangePublish={onVisibleModal} />
      <div className={styles.content}>
        <div className={styles.info}>
          <Item label="投稿ID" content={article.id} />
          <Item label="ユーザーID" content={article.userId} />
          <Item label="ニックネーム" content={article.nickname} />
          <Item
            label="投稿日時"
            content={dayjs(article.postedAt).format("YYYY/MM/DD hh:mm")}
          />
          <Item
            label="最終更新日"
            content={dayjs(article.updatedAt).format("YYYY/MM/DD hh:mm")}
          />
          <Item label="いいね" content={article.good} />
          <Item
            label="コメント"
            content={article.comment}
            className={styles.lastItem}
          />
          <div className={styles.buttonContainer}>
            <Button
              type="normal"
              form="secondary"
              onClick={() => setVisibleDelete(true)}
              className={styles.button}
            >
              削除
            </Button>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <img src={article.image} alt="img" className={styles.image} />
          <div className={styles.delete}>
            <Button
              type="normal"
              form="secondary"
              onClick={() => setVisibleDelete(true)}
            >
              削除
            </Button>
          </div>
        </div>
      </div>
      <TwoChoice
        isVisible={visibleOnPrivate}
        title="公開設定"
        content="記事を非公開にしますか"
        primaryText="はい"
        secondaryText="いいえ"
        onPrimaryClick={() => {
          onChangePublish(false);
          setVisibleOnPrivate(false);
        }}
        onSecondaryClick={() => {
          setVisibleOnPrivate(false);
        }}
        onClose={() => setVisibleOnPrivate(false)}
      />
      <TwoChoice
        isVisible={visibleOnPublic}
        title="公開設定"
        content="記事を公開しますか"
        primaryText="はい"
        secondaryText="いいえ"
        onPrimaryClick={() => {
          onChangePublish(true);
          setVisibleOnPublic(false);
        }}
        onSecondaryClick={() => {
          setVisibleOnPublic(false);
        }}
        onClose={() => setVisibleOnPublic(false)}
      />
      <TwoChoice
        isVisible={visibleDelete}
        title="記事削除"
        content="記事を削除しますか"
        primaryText="はい"
        onPrimaryClick={() => {
          onDelete();
          setVisibleDelete(false);
        }}
        secondaryText="いいえ"
        onSecondaryClick={() => {
          setVisibleDelete(false);
        }}
        onClose={() => setVisibleDelete(false)}
      />
    </PageContainer>
  );
};

export default Detail;
