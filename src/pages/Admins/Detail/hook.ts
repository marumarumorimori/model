import { adminsApi } from "@/api";
import { Admin } from "@/api/typescript-axios";
import { useToast } from "@/hooks/useToast";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";

export const useDetail = (id: number) => {
  const [admin, setAdmin] = useState<Admin>();
  const toast = useToast();
  const history = useHistory();

  const fetchAdmin = async () => {
    const { data } = await adminsApi.getAdminById(id);
    setAdmin(data);
  };

  useEffect(() => {
    fetchAdmin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDelete = () => {
    adminsApi.deleteAdminById(id);

    toast.setToast("管理者を削除しました");
    history.push("/admins");
  };

  return { admin, onDelete };
};
