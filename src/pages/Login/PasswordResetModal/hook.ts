import { useCallback, useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { authApi } from "@/api";

export const useForgotPasswordModals = () => {
  const [passwordResetModal, setPasswordResetModal] = useState(false);
  const location = useLocation();

  const token = useMemo(() => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get("token");
  }, [location.search]);

  const checkPasswordReset = useCallback(() => {
    return Boolean(token);
  }, [token]);

  useEffect(() => {
    setPasswordResetModal(checkPasswordReset());
  }, [checkPasswordReset]);

  const onPasswordSubmit = (password: string, confirmPassword: string) => {
    if (password !== confirmPassword || !token) return;

    authApi.resetPassword({ password, confirmPassword, token });
    setPasswordResetModal(false);
  };

  return {
    onPasswordSubmit,
    passwordResetModal,
    setPasswordResetModal,
  };
};
