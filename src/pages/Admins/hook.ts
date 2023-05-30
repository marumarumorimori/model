import { adminsApi } from "@/api";
import { Admin } from "@/api/typescript-axios";
import { useEffect, useState } from "react";

interface Params {
  page: number;
  keyword?: string;
  sort?: string;
  orderBy?: "asc" | "desc";
}

export const useAdmins = () => {
  const [admins, setAdmins] = useState<Admin[]>();
  const [adminParams, setAdminParams] = useState<Params>({
    page: 1,
    keyword: undefined,
    sort: undefined,
    orderBy: undefined,
  });
  const [total, setTotal] = useState<number>();

  useEffect(() => {
    fetchAdmins(adminParams);
  }, [adminParams]);

  const fetchAdmins = async (adminParams: Params) => {
    const { data } = await adminsApi.getAdmins(
      adminParams.page,
      adminParams.sort,
      adminParams.orderBy,
      adminParams.keyword
    );
    setAdmins(data.admins);
    setTotal(data.total);
  };

  const searchAdmin = (value: string) => {
    const params = { ...adminParams };
    params.keyword = value;

    setAdminParams(params);
  };

  const sortAdmins = (value: string, orderBy: "asc" | "desc") => {
    const params = { ...adminParams };
    params.sort = value;
    params.orderBy = orderBy;

    setAdminParams(params);
  };

  const changePage = (page: number) => {
    const params = { ...adminParams };
    params.page = page;

    setAdminParams(params);
  };

  return {
    admins,
    searchAdmin,
    sortAdmins,
    changePage,
    page: adminParams.page,
    total,
  };
};
