import { GlobalState } from "@/modules/global";
import { ToastState } from "@/modules/toast";

export interface ReduxState {
  reducers: {
    global: GlobalState;
    toast: ToastState;
  };
}
