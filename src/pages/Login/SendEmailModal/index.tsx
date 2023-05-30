import React, { useEffect } from "react";
import OneTextModal from "@/components/Modal/OneText";
import OneChoice from "@/components/Modal/OneChoice";
import { useSendEmail } from "./hook";

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

const SendEmail: React.FunctionComponent<Props> = (props) => {
  const {
    sendMail,
    error,
    setError,
    inputEmailModal,
    setInputEmailModal,
    sentModal,
    setSentModal,
  } = useSendEmail();

  useEffect(() => {
    setInputEmailModal(props.isVisible);
  }, [props.isVisible, setInputEmailModal]);

  return (
    <>
      <OneTextModal
        title="パスワード再設定のURL送信"
        content="パスワード再設定のURLを配信します。登録しているメールアドレスを入力してください"
        isVisible={inputEmailModal}
        primaryText="送信"
        secondaryText="閉じる"
        setPrimaryDisabled={true}
        label="メールアドレス"
        onPrimaryClick={(email: string) => {
          sendMail(email);
        }}
        onSecondaryClick={() => {
          setInputEmailModal(false);
          props.onClose();
          setError("");
        }}
        onClose={() => {
          setInputEmailModal(false);
          props.onClose();
          setError("");
        }}
        error={error}
      />
      <OneChoice
        title="パスワード再設定 URL 送信完了"
        content="パスワード再設定メールを送信しました。メールをご確認のうえ、再設定してください"
        isVisible={sentModal}
        text="閉じる"
        onSelected={() => {
          setSentModal(false);
          props.onClose();
        }}
        onClose={() => setSentModal(false)}
      />
    </>
  );
};

export default SendEmail;
