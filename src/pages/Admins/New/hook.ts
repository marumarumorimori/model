import { useState } from "react";
import { adminsApi } from "@/api";
import { useToast } from "@/hooks/useToast";
import { Error } from "@/models/Error";

export const useNew = () => {
  const toast = useToast();
  const [errors, setError] = useState<Error[]>();

  const createAdmin = async (params: {
    name: string;
    email: string;
    confirmEmail: string;
    password: string;
  }) => {
    try {
      await adminsApi.addAdmin({
        adminName: params.name,
        email: params.email,
        confirmEmail: params.confirmEmail,
        password: params.password,
      });
      toast.setToast("管理者を登録しました");
    } catch (e) {
      if (e.response.status === 400) {
        setError(e.response.data.details);
      }
    }
  };

  return { createAdmin, errors };
};
