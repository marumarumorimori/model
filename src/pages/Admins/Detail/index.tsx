import React, { useState } from "react";
import styles from "./style.scss";
import { useDetail } from "./hook";
import PageContainer from "@/containers/PageContent";
import AdminList from "@/components/List/Admins";
import Button from "@/components/Button/Text";
import { RouteComponentProps } from "react-router-dom";
import TwoChoice from "@/components/Modal/TwoChoice";

interface Props extends RouteComponentProps<{ id: string }> {}

const Detail: React.FunctionComponent<Props> = (props) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const { admin, onDelete } = useDetail(Number(props.match.params.id));

  if (!admin) return null;

  return (
    <>
      <PageContainer className={styles.page}>
        <div>
          <div className={styles.title}>管理者詳細</div>
          <AdminList
            id={admin.id}
            name={admin.name}
            email={admin.email}
            createdAt={admin.createdAt}
          />
        </div>
        <div>
          <div className={styles.buttonContainer}>
            <div className={styles.button}>
              <Button
                type="normal"
                form="secondary"
                onClick={() => setDeleteModal(true)}
              >
                削除
              </Button>
            </div>
          </div>
        </div>
      </PageContainer>
      <TwoChoice
        title="管理者の削除"
        content="管理者を削除しますか"
        primaryText="はい"
        secondaryText="いいえ"
        isVisible={deleteModal}
        onPrimaryClick={() => {
          onDelete();
          setDeleteModal(false);
        }}
        onSecondaryClick={() => setDeleteModal(false)}
        onClose={() => setDeleteModal(false)}
      />
    </>
  );
};

export default Detail;
