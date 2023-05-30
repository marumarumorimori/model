import React, { useState } from "react";
import { useForgotPasswordModals } from "./hook";
import TwoTextModal from "@/components/Modal/TwoText";
import { validatePassword } from "@/utils/common";

interface Props {
  onChangePassword: () => void;
}

const ForgotPasswordModals: React.FunctionComponent<Props> = (props) => {
  const {
    onPasswordSubmit,
    passwordResetModal,
    setPasswordResetModal,
  } = useForgotPasswordModals();
  const [newPasswordError, setNewPasswordError] = useState<
    string | undefined
  >();

  return (
    <TwoTextModal
      title="パスワードの再設定"
      content="新しいパスワード・パスワード確認を入力してください"
      isVisible={passwordResetModal}
      primaryText="登録"
      secondaryText="閉じる"
      primaryType="password"
      secondaryType="password"
      firstLabel="新しいパスワード"
      secondLabel="パスワード再確認"
      setPrimaryDisabled={true}
      onPrimaryClick={(first, second) => {
        onPasswordSubmit(first, second);
        props.onChangePassword();
      }}
      onPrimaryChange={(value) => {
        console.log(value);
        setNewPasswordError(
          !validatePassword(value)
            ? "そのパスワードは使用できません"
            : undefined
        );
      }}
      firstError={newPasswordError}
      onSecondaryClick={() => setPasswordResetModal(false)}
      onClose={() => setPasswordResetModal(false)}
    />
  );
};

export default ForgotPasswordModals;
