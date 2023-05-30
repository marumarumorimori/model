export const setMessage = (value: string) => ({
  type: "toast/SET_MESSAGE" as const,
  payload: value,
});

export const clearMessage = () => ({
  type: "toast/CLEAR_MESSAGE" as const,
});

export type ToastAction = ReturnType<typeof setMessage | typeof clearMessage>;
