import { adminsApi } from "@/api";
import { useReduxState } from "@/hooks/useReduxState";
import { useToast } from "@/hooks/useToast";
import { setAdmin } from "@/modules/global/actions";
import { useState } from "react";
import { useDispatch } from "react-redux";

export const useMyPage = () => {
  const [error, setError] = useState();

  const admin = useReduxState((state) => state.global.admin);
  const toast = useToast();

  const dispatch = useDispatch();

  const handleError = (e: any) => {
    if (e.response.status === 400) {
      setError(e.response.data.details);
    }
  };

  const changeName = async (value: string) => {
    if (!admin) return false;

    try {
      const changedAdmin = { ...admin };
      changedAdmin.name = value;

      await adminsApi.changeAdminNameById(admin.id, { adminName: value });

      dispatch(setAdmin(changedAdmin));
      toast.setToast("管理者情報を変更しました");
      setError(undefined);
      return true;
    } catch (e) {
      handleError(e);
      return false;
    }
  };

  const changeEmail = async (value: string, confirmValue: string) => {
    if (!admin) return false;

    try {
      const changedAdmin = { ...admin };
      await adminsApi.changeAdminEmailById(admin.id, {
        email: value,
        confirmEmail: confirmValue,
      });
      changedAdmin.email = value;
      dispatch(setAdmin(changedAdmin));
      toast.setToast("メールアドレス変更を完了しました");
      return true;
    } catch (e) {
      handleError(e);
      return false;
    }
  };

  const changePassword = async (
    currentPassword: string,
    password: string,
    confirmPassword: string
  ) => {
    if (!admin) return false;
    try {
      await adminsApi.changeAdminPasswordById(admin.id, {
        currentPassword,
        newPassword: password,
        confirmNewPassword: confirmPassword,
      });
      toast.setToast("パスワード変更を完了しました");
      return true;
    } catch (e) {
      handleError(e);
      return false;
    }
  };

  return { admin, changeName, changeEmail, changePassword, error };
};
