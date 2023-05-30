import { setMessage } from "@/modules/toast/actions";
import { useDispatch } from "react-redux";
import { useReduxState } from "./useReduxState";

export const useToast = () => {
  const message = useReduxState((state) => state.toast.message);

  const dispatch = useDispatch();

  const clearMessage = () => {
    dispatch(setMessage(""));
  };

  const setToast = (value: string) => {
    dispatch(setMessage(value));

    setTimeout(() => {
      clearMessage();
    }, 2000);
  };

  return { message, setToast };
};
