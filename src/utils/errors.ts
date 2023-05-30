import { Error } from "@/models/Error";

const errorList: { [key: string]: number[] } = {
  adminName: [18, 19],
  email: [9, 10, 11, 13],
  confirmEmail: [12],
  currentPassword: [25],
  password: [15, 16, 17],
};

export const getError = (errors?: Error[], key?: string) => {
  if (!errors || !key) return;
  const targetList = errorList[key];
  if (!targetList) return;

  return errors.find((item) => targetList.includes(item.code));
};
