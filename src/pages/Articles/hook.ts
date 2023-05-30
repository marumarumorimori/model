import { useEffect, useState, useMemo } from "react";
import { articlesApi } from "@/api";
import { Article } from "@/api/typescript-axios/api";

export const useArticles = () => {
  const [articles, setArticles] = useState<Article[]>();
  const [articleParams, setArticleParams] = useState<{
    page: number;
    keyword?: string;
    sort?: string;
    orderBy?: "asc" | "desc";
  }>({
    page: 1,
    keyword: undefined,
    sort: undefined,
    orderBy: undefined,
  });
  const [total, setTotal] = useState<number>();

  const fetchArticles = async () => {
    const { data } = await articlesApi.getArticles();
    setArticles(data.articles);
    setTotal(data.total);
  };

  const searchArticles = async (keyword: string) => {
    const params = { ...articleParams };

    params.keyword = keyword;
    setArticleParams(params);

    const { data } = await articlesApi.getArticles(
      params.page,
      params.keyword,
      params.sort,
      params.orderBy
    );
    setArticles(data.articles);
    setTotal(data.total);
  };

  const sortArticles = async (value: string, orderBy: "asc" | "desc") => {
    const params = { ...articleParams };

    params.sort = value;
    params.orderBy = orderBy;
    setArticleParams(params);

    const { data } = await articlesApi.getArticles(
      params.page,
      params.keyword,
      params.sort,
      params.orderBy
    );
    setArticles(data.articles);
    setTotal(data.total);
  };

  const changePageArticles = async (page: number) => {
    const params = { ...articleParams };

    params.page = page;
    setArticleParams(params);

    const { data } = await articlesApi.getArticles(
      params.page,
      params.keyword,
      params.sort,
      params.orderBy
    );
    setArticles(data.articles);
    setTotal(data.total);
  };

  const currentPage = useMemo(() => articleParams.page, [articleParams]);

  useEffect(() => {
    fetchArticles();
  }, []);

  return {
    articles,
    searchArticles,
    sortArticles,
    changePageArticles,
    currentPage,
    articleParams,
    total,
  };
};
