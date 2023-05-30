import { authApi } from "@/api";
import { useReduxState } from "@/hooks/useReduxState";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { globalClear } from "@/modules/global/actions";

export const useNavigation = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const admin = useReduxState((state) => state.global.admin);

  const onLogout = () => {
    authApi.logout();
    dispatch(globalClear());
    history.push("/login");
  };

  return { admin, onLogout };
};
