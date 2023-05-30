import { useEffect, useState } from "react";
import { usersApi } from "@/api";
import { User } from "@/api/typescript-axios/api";

interface Params {
  page: number;
  keyword?: string;
  sort?: string;
  orderBy?: "asc" | "desc";
}

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>();
  const [userParams, setUserParams] = useState<Params>({
    page: 1,
    keyword: undefined,
    sort: undefined,
    orderBy: undefined,
  });
  const [total, setTotal] = useState<number>();

  const fetchUsers = async (params: Params) => {
    setUserParams(params);

    const { data } = await usersApi.getUsers(
      params.page,
      params.sort,
      params.orderBy,
      params.keyword
    );
    setUsers(data.users);
    setTotal(data.total);
  };

  const searchUsers = async (value: string) => {
    const params = { ...userParams };

    params.keyword = value;
    fetchUsers(params);
  };

  const sortUsers = async (value: string, orderBy: "asc" | "desc") => {
    const params = { ...userParams };

    params.sort = value;
    params.orderBy = orderBy;

    fetchUsers(params);
  };

  const onChangePage = (page: number) => {
    const params = { ...userParams };

    params.page = page;

    fetchUsers(params);
  };

  useEffect(() => {
    fetchUsers(userParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    users,
    searchUsers,
    sortUsers,
    onChangePage,
    page: userParams.page,
    total,
  };
};
