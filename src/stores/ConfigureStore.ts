import { createStore, combineReducers } from "redux";
import reducers from "../modules";
import { persistStore } from "redux-persist";

export default function createStoreWithMiddleware() {
  const store = createStore(combineReducers({ reducers }));
  const persistor = persistStore(store);

  return { store, persistor };
}
