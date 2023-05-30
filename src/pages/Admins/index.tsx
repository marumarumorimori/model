import React from "react";
import styles from "./style.scss";
import { useAdmins } from "./hook";
import Header from "@/components/Header/Add";
import { Admin } from "@/api/typescript-axios";
import Pager from "@/components/Pager";
import cn from "classnames";
import { Link } from "react-router-dom";
import { PageContainer } from "@/containers/PageContent";
import EmailImg from "@/assets/images/icon/ic_mail_large.png";

interface ItemProps {
  admin: Admin;
}

const Item: React.FunctionComponent<ItemProps> = (props) => {
  return (
    <div className={styles.linkContainer}>
      <Link to={`/admins/${props.admin.id}`}>
        <div className={styles.itemContainer}>
          <div className={styles.item}>
            <div className={styles.idName}>
              <div className={styles.id}>{props.admin.id}</div>
              <div className={cn(styles.name, styles.pc)}>
                {props.admin.name}
              </div>
              <div className={cn(styles.name, styles.sp)}>
                ({props.admin.name})
              </div>
            </div>
            <div className={styles.row}>
              <img src={EmailImg} alt="email" />
              <div className={styles.email}>{props.admin.email}</div>
            </div>
            <div className={styles.createdAt}>{props.admin.createdAt}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

interface ListProps {
  admins: Admin[];
}

const List: React.FunctionComponent<ListProps> = (props) => {
  if (!props.admins.length) {
    return (
      <div className={styles.empty}>該当する管理者は見つかりませんでした</div>
    );
  }

  return (
    <>
      <ListHeader />
      <div>
        {props.admins.map((admin, index) => (
          <Item admin={admin} key={index} />
        ))}
      </div>
    </>
  );
};

const ListHeader: React.FunctionComponent = () => {
  return (
    <div className={styles.listHeader}>
      <div className={styles.id}>ID</div>
      <div className={styles.name}>投稿者名</div>
      <div className={styles.email}>メールアドレス</div>
      <div className={styles.createdAt}>登録日</div>
    </div>
  );
};

const Admins: React.FunctionComponent = () => {
  const {
    admins,
    searchAdmin,
    sortAdmins,
    changePage,
    page,
    total,
  } = useAdmins();

  return (
    <PageContainer>
      <Header
        title="管理者一覧"
        onSearch={searchAdmin}
        sortList={[
          {
            text: "レコードID(昇順)",
            value: "recordIdAsc",
            onClick: () => sortAdmins("id", "asc"),
          },
          {
            text: "レコードID(降順)",
            value: "recordIdDesc",
            onClick: () => sortAdmins("id", "desc"),
          },
          {
            text: "管理者名(昇順)",
            value: "nicknameAsc",
            onClick: () => sortAdmins("name", "asc"),
          },
          {
            text: "管理者名(降順)",
            value: "nicknameDesc",
            onClick: () => sortAdmins("name", "desc"),
          },
          {
            text: "メールアドレス(昇順)",
            value: "emailAsc",
            onClick: () => sortAdmins("email", "asc"),
          },
          {
            text: "メールアドレス(降順)",
            value: "emailDesc",
            onClick: () => sortAdmins("email", "desc"),
          },
          {
            text: "登録日時(昇順)",
            value: "createdAtAsc",
            onClick: () => sortAdmins("created_at", "asc"),
          },
          {
            text: "登録日時(降順)",
            value: "createdAtDesc",
            onClick: () => sortAdmins("created_at", "desc"),
          },
        ]}
      />
      {admins && <List admins={admins} />}
      {admins && admins.length && total ? (
        <div className={styles.pager}>
          <Pager
            current={page}
            lastPage={Math.ceil(total / 20)}
            onChangePage={changePage}
          />
        </div>
      ) : null}
    </PageContainer>
  );
};

export default Admins;
