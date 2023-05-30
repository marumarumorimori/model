import React, { useState } from "react";
import styles from "./style.scss";
import { useNew } from "./hook";
import TextInput from "@/components/TextInput";
import Button from "@/components/Button/Text";
import PageContainer from "@/containers/PageContent";
import Hint from "@/components/Hint";
import cn from "classnames";
import { getError } from "@/utils/errors";
import TwoChoice from "@/components/Modal/TwoChoice";

const AdminNew: React.FunctionComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const { createAdmin, errors } = useNew();

  return (
    <PageContainer className={styles.component}>
      <div>
        <div className={styles.title}>新規管理者登録</div>
        <div className={cn(styles.form, styles.border)}>
          <div className={styles.label}>氏名</div>
          <div className={styles.textInput}>
            <TextInput
              value={name}
              onChange={(value) => setName(value)}
              error={getError(errors, "adminName")?.description}
            />
          </div>
        </div>
        <div className={cn(styles.form, styles.border)}>
          <div className={styles.label}>メールアドレス</div>
          <div className={styles.textInput}>
            <TextInput
              value={email}
              onChange={(value) => setEmail(value)}
              error={getError(errors, "email")?.description}
            />
            <div className={styles.note}>
              <span className={styles.break}>
                確認のためもう一度入力してください
              </span>
              （コピー・貼り付けはしないでください）
            </div>
            <TextInput
              value={confirmEmail}
              onChange={(value) => setConfirmEmail(value)}
              error={
                Boolean(getError(errors, "email")) ||
                getError(errors, "confirmEmail")?.description
              }
            />
          </div>
        </div>
        <div className={styles.form}>
          <div className={styles.label}>
            パスワード
            <Hint
              text={`8文字以上半角英数字、一部半角記号（!"#$%&'()*+,-./:;<=>?@[]^_\`{|}~)`}
            />
          </div>
          <div className={styles.textInput}>
            <TextInput
              value={password}
              type="password"
              onChange={(value) => setPassword(value)}
              error={getError(errors, "password")?.description}
            />
          </div>
        </div>
      </div>
      <div>
        <div className={styles.buttonContainer}>
          <Button
            onClick={() => setIsVisible(true)}
            className={styles.button}
            disabled={
              !name.length ||
              !email.length ||
              !confirmEmail.length ||
              !password.length
            }
          >
            登録
          </Button>
        </div>
      </div>
      <TwoChoice
        title="新規管理者登録"
        content="入力した内容で管理者を登録しますか"
        isVisible={isVisible}
        primaryText="はい"
        secondaryText="いいえ"
        onPrimaryClick={() => {
          setIsVisible(false);
          createAdmin({ name, email, confirmEmail, password });
        }}
        onSecondaryClick={() => setIsVisible(false)}
        onClose={() => setIsVisible(false)}
      />
    </PageContainer>
  );
};

export default AdminNew;
