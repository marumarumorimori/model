import { useCallback, useState } from "react";
import { usersApi, articlesApi } from "@/api";
import { User, Article } from "@/api/typescript-axios/api";
import { useToast } from "@/hooks/useToast";

interface ArticleParams {
  page: number;
  keyword?: string;
  sort?: string;
  orderBy?: "asc" | "desc";
  userId?: number;
}

export const useDetail = (id: number) => {
  const [user, setUser] = useState<User>();
  const [articles, setArticles] = useState<Article[]>();
  const [articleParams, setArticleParams] = useState<ArticleParams>({
    page: 1,
    keyword: undefined,
    sort: undefined,
    orderBy: undefined,
    userId: undefined,
  });

  const { setToast } = useToast();

  const fetchUser = useCallback(async () => {
    const { data } = await usersApi.getUserById(id);
    setUser(data);

    const params = { ...articleParams };
    params.userId = data.id;
    setArticleParams(params);

    return data;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchArticle = useCallback(async (params: ArticleParams) => {
    if (!params.userId) return;
    const { data } = await articlesApi.getArticles(
      params.page,
      params.keyword,
      params.sort,
      params.orderBy,
      params.userId
    );
    setArticles(data.articles);
    setArticleParams(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeFrozen = async (frozen: boolean) => {
    await usersApi.changeUserFrozen(id, { frozen });
    await fetchUser();
    frozen
      ? setToast("ユーザーを停止状態にしました")
      : setToast("ユーザーを使用可能にしました");
  };

  const initialize = async () => {
    const user = await fetchUser();
    const params = { ...articleParams };
    params.userId = user.id;
    fetchArticle(params);
  };

  const sortArticles = (value: string, orderBy: "asc" | "desc") => {
    const params = { ...articleParams };

    params.sort = value;
    params.orderBy = orderBy;

    fetchArticle(params);
  };

  const onSearch = (value: string) => {
    const params = { ...articleParams };

    params.keyword = value;

    fetchArticle(params);
  };

  const onChangePage = (page: number) => {
    const params = { ...articleParams };
    params.page = page;

    fetchArticle(params);
  };

  return {
    user,
    articles,
    articleParams,
    changeFrozen,
    initialize,
    sortArticles,
    onSearch,
    onChangePage,
  };
};
