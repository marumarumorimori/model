import { Admin } from "@/models/Admin";

export const setAdmin = (admin: Admin) => ({
  type: "global/SET_ADMIN" as const,
  payload: admin,
});

export const globalClear = () => ({
  type: "global/CLEAR" as const,
});

export type GlobalAction = ReturnType<typeof setAdmin | typeof globalClear>;
