import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { setAdmin } from "@/modules/global/actions";
import { authApi } from "@/api";

export const useLogin = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const dispatch = useDispatch();
  const history = useHistory();

  const onLogin = async (email: string, password: string) => {
    try {
      const { data } = await authApi.login({
        email,
        password,
      });
      localStorage.setItem("X-PecoriToken", data.token);
      dispatch(setAdmin(data.admin));
      history.push("/");
    } catch (e) {
      setErrorMessage("ログイン情報に誤りがあります");
    }
  };

  const onChangePassword = () => {
    setErrorMessage("パスワード再設定を完了しました。再度ログインしてください");
    history.push("/login");
  };

  return { onLogin, errorMessage, onChangePassword };
};
