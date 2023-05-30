import React from "react";
import styles from "./style.scss";
import { useUsers } from "./hook";
import PageContainer from "@/containers/PageContent";
import Header from "@/components/Header/Segment";
import UserList from "@/components/List/Users";
import Pager from "@/components/Pager";

const Users: React.FunctionComponent = () => {
  const {
    users,
    searchUsers,
    sortUsers,
    onChangePage,
    page,
    total,
  } = useUsers();

  return (
    <PageContainer>
      <Header
        title="ユーザー一覧"
        onSearch={(value) => searchUsers(value)}
        sortList={[
          {
            text: "レコードID(昇順)",
            value: "recordIdAsc",
            onClick: () => sortUsers("id", "asc"),
          },
          {
            text: "レコードID(降順)",
            value: "recordIdDesc",
            onClick: () => sortUsers("id", "desc"),
          },
          {
            text: "ユーザーID(昇順)",
            value: "userIdAsc",
            onClick: () => sortUsers("login_id", "asc"),
          },
          {
            text: "ユーザーID(降順)",
            value: "userIdDesc",
            onClick: () => sortUsers("login_id", "desc"),
          },
          {
            text: "ニックネーム(昇順)",
            value: "nicknameAsc",
            onClick: () => sortUsers("nickname", "asc"),
          },
          {
            text: "ニックネーム(降順)",
            value: "NnicknameDesc",
            onClick: () => sortUsers("nickname", "desc"),
          },
          {
            text: "登録日時(昇順)",
            value: "createdAtAsc",
            onClick: () => sortUsers("created_at", "asc"),
          },
          {
            text: "登録日時(降順)",
            value: "createdAtDesc",
            onClick: () => sortUsers("created_at", "desc"),
          },
          {
            text: "使用状態(昇順)",
            value: "statusAsc",
            onClick: () => sortUsers("status", "asc"),
          },
          {
            text: "使用状態(降順)",
            value: "statusDesc",
            onClick: () => sortUsers("status", "desc"),
          },
        ]}
      />
      {users && <UserList users={users} />}
      {users && users.length && total ? (
        <div className={styles.pager}>
          <Pager
            current={page}
            lastPage={Math.ceil(total / 20)}
            onChangePage={onChangePage}
          />
        </div>
      ) : null}
    </PageContainer>
  );
};

export default Users;
