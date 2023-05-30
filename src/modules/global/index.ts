import { GlobalAction } from "./actions";
import { Reducer } from "redux";
import { Admin } from "@/models/Admin";
import produce from "immer";

export interface GlobalState {
  admin?: Admin;
}

const initialState: GlobalState = {
  admin: undefined,
};

export const global: Reducer<GlobalState, GlobalAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case "global/SET_ADMIN":
      return produce(state, (draft) => {
        draft.admin = action.payload;
      });
    case "global/CLEAR":
      return produce(state, (draft) => {
        draft.admin = undefined;
      });
    default:
      return state;
  }
};
