import { Reducer } from "redux";
import { ToastAction } from "./actions";
import produce from "immer";

export interface ToastState {
  message?: string;
}

const initialState: ToastState = {
  message: undefined,
};

export const toast: Reducer<ToastState, ToastAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case "toast/SET_MESSAGE":
      return produce(state, (draft) => {
        draft.message = action.payload;
      });
    case "toast/CLEAR_MESSAGE":
      return produce(state, (draft) => {
        draft.message = undefined;
      });
    default:
      return state;
  }
};
