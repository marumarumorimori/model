import React, { useState } from "react";
import { useLogin } from "./hook";
import styles from "./style.scss";
import Logo from "@/assets/images/icon/img_logo.png";
import TextInput from "@/components/TextInput";
import Button from "@/components/Button/Text";
import cn from "classnames";
import PasswordResetModal from "./PasswordResetModal";
import SendEmailModal from "./SendEmailModal";

const Login: React.FunctionComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotPasswordModal, setForgotPasswordModal] = useState(false);

  const { onLogin, errorMessage, onChangePassword } = useLogin();

  return (
    <div className={styles.component}>
      <div className={styles.container}>
        <div className={cn(styles.logo, { [styles.isError]: errorMessage })}>
          <img src={Logo} alt="Logo" />
        </div>
        {errorMessage && (
          <div className={styles.errorMessage}>{errorMessage}</div>
        )}
        <TextInput
          value={email}
          onChange={(value) => setEmail(value)}
          type="email"
          label="メールアドレス"
          placeholder="メールアドレス"
          className={styles.input}
        />
        <TextInput
          value={password}
          onChange={(value) => setPassword(value)}
          type="password"
          label="パスワード"
          placeholder="パスワード"
          className={styles.input}
        />
        <div className={styles.buttonContainer}>
          <Button
            type="A"
            className={styles.login}
            onClick={() => onLogin(email, password)}
            disabled={!(email.length && password.length)}
          >
            ログイン
          </Button>
        </div>
        <Button
          type="link"
          className={styles.forget}
          onClick={() => setForgotPasswordModal(true)}
        >
          パスワードを忘れた方はこちら
        </Button>
      </div>
      <PasswordResetModal onChangePassword={onChangePassword} />
      <SendEmailModal
        isVisible={forgotPasswordModal}
        onClose={() => setForgotPasswordModal(false)}
      />
    </div>
  );
};

export default Login;
