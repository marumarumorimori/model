import { ReduxState } from "../ReduxState";
import { useSelector } from "react-redux";
import { useCallback } from "react";

export const useReduxState = <TSelected>(
  selector: (state: ReduxState["reducers"]) => TSelected
) =>
  useSelector<ReduxState, TSelected>(
    //eslint-disable-next-line react-hooks/exhaustive-deps
    useCallback((s) => selector(s.reducers), [])
  );
