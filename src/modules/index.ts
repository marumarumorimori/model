import { persistCombineReducers } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { global } from "./global";
import { toast } from "./toast";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["global"],
};

const reducers = persistCombineReducers(persistConfig, { global, toast });

export default reducers;
