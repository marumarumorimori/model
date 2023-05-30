import React, { useState } from "react";
import styles from "./style.scss";
import ListItem from "@/components/List/Details/Item";
import OneTextModal from "@/components/Modal/OneText";
import TwoTextModal from "@/components/Modal/TwoText";
import ThreeText from "@/components/Modal/ThreeText";
import { Error } from "@/models/Error";
import { getError } from "@/utils/errors";
import { validatePassword } from "@/utils/common";

interface EditButtonProps {
  onClick?: () => void;
}

const EditButton: React.FunctionComponent<EditButtonProps> = (props) => {
  return <div className={styles.editButton} onClick={props.onClick} />;
};

interface Props {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  onChangeName?: (value: string) => Promise<boolean>;
  onChangeEmail?: (email: string, confirmEmail: string) => Promise<boolean>;
  onChangePassword?: (
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
  ) => Promise<boolean>;
  errors?: Error[];
}

const AdminList: React.FunctionComponent<Props> = (props) => {
  const [nameModal, setNameModal] = useState(false);
  const [emailModal, setEmailModal] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState<
    string | undefined
  >();

  return (
    <>
      <ListItem label="管理者ID" content={props.id} stretch />
      <ListItem
        label="管理者名"
        content={props.name}
        after={
          props.onChangeName && (
            <EditButton onClick={() => setNameModal(true)} />
          )
        }
        stretch
      />
      <ListItem
        label="メールアドレス"
        content={props.email}
        after={
          props.onChangeEmail && (
            <EditButton onClick={() => setEmailModal(true)} />
          )
        }
        stretch
      />
      <ListItem
        label="パスワード"
        content="●●●●●●●●●●●●"
        after={
          props.onChangePassword && (
            <EditButton onClick={() => setPasswordModal(true)} />
          )
        }
        stretch
      />
      <ListItem label="登録日" content={props.createdAt} stretch />
      {props.onChangeName && (
        <OneTextModal
          title="管理者名変更"
          content="新しい名前を入力してください"
          primaryText="変更"
          secondaryText="閉じる"
          label="管理者名"
          onPrimaryClick={async (value) => {
            const changed =
              props.onChangeName && (await props.onChangeName(value));
            if (changed) {
              setNameModal(false);
            }
          }}
          onSecondaryClick={() => setNameModal(false)}
          isVisible={nameModal}
          onClose={() => setNameModal(false)}
          setPrimaryDisabled={true}
          error={getError(props.errors, "adminName")?.description}
        />
      )}
      {props.onChangeEmail && (
        <TwoTextModal
          title="メールアドレス変更"
          content="新しいメールアドレス・確認 メールアドレス・パスワードを入力してください"
          primaryText="変更"
          secondaryText="閉じる"
          onPrimaryClick={async (email, confirmEmail) => {
            const changed =
              props.onChangeEmail &&
              (await props.onChangeEmail(email, confirmEmail));
            if (changed) {
              setEmailModal(false);
            }
          }}
          onSecondaryClick={() => setEmailModal(false)}
          isVisible={emailModal}
          onClose={() => setEmailModal(false)}
          firstLabel="新しいメールアドレス"
          secondLabel="メールアドレス再確認"
          setPrimaryDisabled={true}
          firstError={getError(props.errors, "email")?.description}
          secondError={
            Boolean(getError(props.errors, "email")) ||
            getError(props.errors, "confirmEmail")?.description
          }
        />
      )}
      {props.onChangePassword && (
        <ThreeText
          title="パスワード変更"
          content="現在のパスワード・新しいパスワード 確認パスワードを入力してください"
          primaryText="変更"
          secondaryText="閉じる"
          firstType="password"
          secondType="password"
          thirdType="password"
          firstLabel="現在のパスワード"
          secondLabel="新しいパスワード"
          thirdLabel="パスワード再確認"
          onPrimaryClick={async (current, changedPassword, confirmChanged) => {
            const changed =
              props.onChangePassword &&
              (await props.onChangePassword(
                current,
                changedPassword,
                confirmChanged
              ));
            if (changed) {
              setPasswordModal(false);
            }
          }}
          onSecondaryClick={() => setPasswordModal(false)}
          isVisible={passwordModal}
          onClose={() => setPasswordModal(false)}
          onSecondaryChange={(value) => {
            setNewPasswordError(
              !validatePassword(value)
                ? "そのパスワードは使用できません"
                : undefined
            );
          }}
          setPrimaryDisabled={true}
          firstError={getError(props.errors, "currentPassword")?.description}
          secondError={
            getError(props.errors, "password")?.description || newPasswordError
          }
          thirdError={Boolean(getError(props.errors, "password"))}
        />
      )}
    </>
  );
};

export default AdminList;
