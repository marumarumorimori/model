import React from "react";
import styles from "./style.scss";
import { useMyPage } from "./hook";
import PageContainer from "@/containers/PageContent";
import AdminList from "@/components/List/Admins";

const MyPage: React.FunctionComponent = () => {
  const { admin, changeName, changeEmail, changePassword, error } = useMyPage();

  if (!admin) return null;

  return (
    <PageContainer className={styles.page}>
      <div className={styles.title}>マイページ</div>
      <AdminList
        id={admin.id}
        name={admin.name}
        email={admin.email}
        createdAt={admin.createdAt}
        onChangeName={changeName}
        onChangeEmail={changeEmail}
        onChangePassword={changePassword}
        errors={error}
      />
    </PageContainer>
  );
};

export default MyPage;
