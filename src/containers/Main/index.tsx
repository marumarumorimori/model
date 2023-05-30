import React, { useEffect, useMemo } from "react";
import styles from "./style.scss";
import Navigation from "@/components/Navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useLocation, useHistory } from "react-router";
import { useReduxState } from "@/hooks/useReduxState";

const Main: React.FunctionComponent = (props) => {
  const location = useLocation();
  const admin = useReduxState((state) => state.global.admin);
  const history = useHistory();

  useEffect(() => {
    if (location.pathname !== "/login" && !admin) {
      history.push("/login");
    }
  }, [location, admin, history]);

  const breadcrumbsText = useMemo(() => {
    const pathname = location.pathname;

    switch (true) {
      case /^\/$/.test(pathname):
        return "記事一覧";
      case /^\/articles\/\d*$/.test(pathname):
        return "記事一覧 > 記事詳細";
      case /^\/my-page$/.test(pathname):
        return "マイページ";
      case /^\/users$/.test(pathname):
        return "ユーザー一覧";
      case /^\/users\/\d*$/.test(pathname):
        return "ユーザー一覧 > ユーザー詳細";
      case /^\/admins$/.test(pathname):
        return "管理者一覧";
      case /^\/admins\/new$/.test(pathname):
        return "管理者一覧 > 新規管理者登録";
      case /^\/admins\/\d*$/.test(pathname):
        return "管理者一覧 > 管理者詳細";
      default:
        return "";
    }
  }, [location]);

  return (
    <div className={styles.component}>
      <Navigation />
      <main className={styles.main}>
        <Breadcrumbs text={breadcrumbsText} />
        <div>{props.children}</div>
      </main>
    </div>
  );
};

export default Main;
