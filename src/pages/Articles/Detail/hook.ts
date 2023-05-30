import { Article } from "@/api/typescript-axios";
import { articlesApi } from "@/api";
import { useState } from "react";
import { useToast } from "@/hooks/useToast";
import { useHistory } from "react-router";

export const useDetail = (id: number) => {
  const [article, setArticle] = useState<Article>();

  const history = useHistory();

  const { setToast } = useToast();

  const fetchArticle = async () => {
    const { data } = await articlesApi.getArticleById(id);
    setArticle(data);
  };

  const init = () => {
    fetchArticle();
  };

  const onChangePublish = async (value: boolean) => {
    await articlesApi.changeArticlePublicById(id, { public: value });
    await fetchArticle();

    value ? setToast("記事を非公開にしました") : setToast("記事を公開しました");
  };

  const onDelete = () => {
    articlesApi.deleteArticleById(id);
    setToast("記事を削除しました");
    history.push("/");
  };

  return { init, article, onChangePublish, onDelete };
};
